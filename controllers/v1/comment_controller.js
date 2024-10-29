/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----


// ----- Custom modules -----
const commentModel = require("./../../models/comment_model");
const userModel = require("./../../models/user_model");
const tutorialModel = require("./../../models/tutorial_model");
const commentValidator = require("./../../validators/comment_validator");



exports.addComment = async (req, res) => {
    try {

        const {error} = commentValidator.validate(req.body);
        if(error){
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        const { body, tutorialHref, review, parentCommentId} = req.body;

        // Verify if the user is banned
        const user = await userModel.findById(req.userId);
        if (!user || user.status === "BANNED") {
            return res.status(403).json({ message: "Access denied. User is banned." });
        }

        // Find the tutorial by href
        const selectedTutorial = await tutorialModel.findOne( {href: tutorialHref}).lean();       
        if (!selectedTutorial) {
            return res.status(404).json({ message: "Tutorial not found." });
        }

        // Check if parentCommentId is provided and valid (for replies)
        if (parentCommentId) {
            const parentComment = await commentModel.findById(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ message: "Parent comment not found." });
            }
        }

        // Create the new comment
        const newComment = await commentModel.create({
            body,
            tutorialId: selectedTutorial._id,
            userId: req.userId, // Set from the authenticated user (verifyToken)
            isAccepted: false,  // Default status for new comments
            review,
            parentCommentId: parentCommentId || null // Set parentCommentId if it's a reply
        });

        if(newComment) {
        return res.status(200).json({ message: "Comment added successfully", newComment });
        }
        
    } catch (error) {
        console.error("Error during registration: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }
};