/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const {isValidObjectId} = require ("mongoose");

// ----- Custom modules -----
const userModel = require("./../../models/user_model");
const banUserModel = require("../../models/userBan_model");


exports.banUser = async (req, res) => {
    try {
        
        // Validate the user ID
        if(!isValidObjectId(req.params.id)) {
            return res.status(422).json({ message: "Invalid user ID."});
        } 

        // Find the user in the main user model
        const mainUser = await userModel.findById(req.params.id);
        
        if(!mainUser) {
            return res.status(404).json({message: "User not found."});
        }

        // Check if the user is already banned
        if(mainUser.status === "BANNED") {
            return res.status(409).json({ message: "User is already banned." });
        }

        // Ensure 'reason' is provided in the request body
        const { reason, banExpiresAt } = req.body;
        if (!reason) {
            return res.status(400).json({ message: "Reason for ban is required." });
        }

        // If no expiration date, it's a permanent ban
        const isPermanent = !banExpiresAt;

        // Update the user status to 'BANNED'
        mainUser.status = "BANNED";
        const updatedUser = await mainUser.save();

        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update user status." });
        }

        // Get the admin who is banning the user - in tokenverify middleware we attached the user object to the request
        const bannedBy = req.userId; 

        // Proceed to ban the user by adding them to the banned users collection
        const banUserResult = await banUserModel.create({
             email: mainUser.email,
             reason: reason,
             bannedBy: bannedBy,
             isPermanent: isPermanent,
             banExpiresAt: banExpiresAt || null           
            });
            
        if (!banUserResult) {
            mainUser.status = "ACTIVE";
            await mainUser.save();
            return res.status(500).json({ message: "Failed to ban user." });
        }

        return res.status(200).json({message: "User banned successfully."});

    } catch (error) {
        console.error("Error during bann: ", error.message);
        return res.status(500).json({message: "Internal server error."}) 
    }
};


exports.getAllUsers = async(req,res) => {
    try {
        // Retrieve all users from the database
        const users = await userModel.find({}).select("-password -_id -__v");

        // The find({}) query will return an empty array [] if no users exist
        // Check if there are no users
        if(!users) {
            return res.status(404).json({message: "No user to display."});
        }

        // Return the list of users
        return res.status(200).json({ message: "Users retrieved successfully", users });

    } catch (error) {
        console.error("Error during get all users: ", error.message);
        return res.status(500).json({message: "Internal server error."})
    }
};


exports.removeUser = async(req, res) => {
    try {

        // Validate the user ID
        if(!isValidObjectId(req.params.id)) {
            return res.status(422).json({ message: "Invalid user ID."});
        }

        // Attempt to find and delete the user by ID
        const removedUser = await userModel.findByIdAndDelete(req.params.id);

        // If no user is found to delete
        if(!removedUser) {
            return res.status(404).json({ message: "User not found to delete."});
        }

        // Remove user from bannedUsers collection if they exist there
        await banUserModel.findOneAndDelete({ email:removedUser.email });

        // Return success message if user was deleted
        return res.status(200).json({ message: "User deleted successfully."});

    } catch (error) {
        console.error("Error during user removal: ", error.message);
        return res.status(500).json({message: "Internal server error."}) 
    }
};