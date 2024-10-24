/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

const userModel = require('./../models/user_model');

module.exports = async(req,res, next) => {
    try {
        
        const userId = req.body;
    
        const user = await userModel.findOne({ _id: userId }).lean();
    
        if(!user){
            return res.status(404).json({message: "User not found"});
        } 

        // Check if the user has the admin role
        if(user.role === "ADMIN") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
    
        next();

    } catch (error) {
        console.error("Error during admin check: ", error);
        return res.status(500).json({ message: "Internal server error." });
    }

}
