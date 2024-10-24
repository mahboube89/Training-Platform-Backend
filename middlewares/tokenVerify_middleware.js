/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";


// ----- Node modules -----
const jwt = require('jsonwebtoken');


// ----- Custom modules -----
const userModel = require("./../models/user_model");


module.exports = async(req, res, next) => {

    try {

        // Get the Authorization header
        const authHeader = req.header("Authorization");

        // Check if the Authorization header is present and formatted correctly
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(403).json({ message: "Access denied. No token provided." });
        }

        // Extract the token from the Authorization header
        const token = authHeader?.split(" ")[1];

        // Verify the JWT token
        const jwtVerify = jwt.verify(token, process.env.JWT_SECRET);       

        // Find the user by the decoded token's ID and attach to req.user
        const user = await userModel.findById(jwtVerify._id).lean();
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Attach the user object to the request
        req.userId = user._id;
        
        next();
        
    } catch (error) {
        console.error("Error during token verification: ", error.message);
        return res.status(401).json({message: "Invalid or expired token."})
    }
}