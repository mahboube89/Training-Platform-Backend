/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Custom modules -----
const userModel = require('./../models/user_model');

// Middleware to check if the user has one of the specified roles
const checkRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Ensure `req.userId` is set by `verifyToken`
            if (!req.userId) {
                return res.status(401).json({ message: "Unauthorized. No user ID found." });
            }

            // Retrieve the user from the database using `req.userId`
            const user = await userModel.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // Check if the user's role is one of the allowed roles
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: "Access denied. Insufficient role." });
            }

            // Set `req.user` to the found user document for use in other middlewares/controllers
            req.user = user;
            next();

        } catch (error) {
            console.error("Error in checkRole middleware:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = checkRole;
