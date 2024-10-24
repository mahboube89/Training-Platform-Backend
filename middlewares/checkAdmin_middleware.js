/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

const userModel = require('./../models/user_model');

module.exports = async(req,res, next) => {
    try {
        
        // Get userId from request (from token payload)
        const userId = req.userId;       
    
        // Find the user in the database
        const user = await userModel.findOne({ _id: userId }).lean();
    
        // Check if the user exists
        if(!user){
            return res.status(404).json({message: "User not found"});
        } 

        // Check if the user has the admin role
        if(user.role !== "ADMIN") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
    
        // If the user is an admin, continue to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Error during admin check: ", error);
        return res.status(500).json({ message: "Internal server error." });
    }

};
