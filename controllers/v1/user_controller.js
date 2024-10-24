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

        // Update the user status to 'BANNED'
        user.status = "BANNED";
        const updatedUser = await user.save();

        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update user status." });
        }

        // Ensure 'reason' is provided in the request body
        const { reason, banExpiresAt } = req.body;
        if (!reason) {
            return res.status(400).json({ message: "Reason for ban is required." });
        }

        const bannedBy = req.user.username || req.user.id ;

        // Proceed to ban the user by adding them to the banned users collection
        const banUserResult = await banUserModel.create({
             email: mainUser.email,
             reason: reason,
             bannedBy: bannedBy,
             banExpiresAt: banExpiresAt || null           
            });

            
        if (!banUserResult) {
            return res.status(500).json({ message: "Failed to ban user." });
        }

        return res.status(200).json({message: "User banned successfully."});

    } catch (error) {
        console.error("Error during bann: ", error.message);
        return res.status(500).json({message: "Internal server error."}) 
    }
};