/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const {isValidObjectId} = require ("mongoose");

// ----- Custom modules -----
const commentModel = require("./../../models/comment_model");
const userModel = require("./../../models/user_model");
const tutorialModel = require("./../../models/tutorial_model");
const blogModel = require("./../../models/blog_model");
const commentValidator = require("./../../validators/comment_validator");



exports.addCommentToTutorial = async (req, res) => {
    try {

        // Extract content type and ID from the request parameters
        const {contentId } = req.params;

        const contentType = req.path.includes("/tutorial/") ? "tutorial" : "blog";


        // Initialize variable to hold content (either tutorial or blog)
        let content;
        if (contentType.toUpperCase() === "TUTORIAL") {
            content = await tutorialModel.findById(contentId).lean(); // Use contentId directly
        } else if (contentType.toUpperCase() === "BLOG") {
            content = await blogModel.findById(contentId).lean(); // Use contentId directly
        }     

        // If the content is not found, return a 404 error
        if (!content) {
            return res.status(404).json({ message: `${contentType} not found.` });
        }

        // Validate the comment body using Joi validator
        const {error} = commentValidator.validate(req.body);
        if(error){
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Destructure comment fields from the request body
        const { body, review, parentCommentId} = req.body;
        

        // Verify if the user is banned
        const user = await userModel.findById(req.userId);
        if (!user || user.status === "BANNED") {
            return res.status(403).json({ message: "Access denied. User is banned." });
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
            referenceType: contentType.toUpperCase(), // Set reference type as either 'TUTORIAL' or 'BLOG'
            referenceId:content._id,    // Reference the ID of the related content
            userId: req.userId,         // Set from the authenticated user (verifyToken)
            isAccepted: false,          // Default status for new comments
            review,
            parentCommentId: parentCommentId || null // Set parentCommentId if it's a reply
        });

        if(newComment) {
        return res.status(200).json({ message: "Comment added successfully", newComment });
        }
        
    } catch (error) {
        console.error("Error during add comment: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }
};



exports.addCommentToBlog = async (req, res) => {
    try {

        // Extract content type and ID from the request parameters
        const {contentId } = req.params;

        const contentType = req.path.includes("/blog/") ? "blog" : "tutorial";


        // Initialize variable to hold content (either tutorial or blog)
        let content;
        if (contentType.toUpperCase() === "TUTORIAL") {
            content = await tutorialModel.findById(contentId).lean(); // Use contentId directly
        } else if (contentType.toUpperCase() === "BLOG") {
            content = await blogModel.findById(contentId).lean(); // Use contentId directly
        }     

        // If the content is not found, return a 404 error
        if (!content) {
            return res.status(404).json({ message: `${contentType} not found.` });
        }

        // Validate the comment body using Joi validator
        const {error} = commentValidator.validate(req.body);
        if(error){
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Destructure comment fields from the request body
        const { body, review, parentCommentId} = req.body;
        

        // Verify if the user is banned
        const user = await userModel.findById(req.userId);
        if (!user || user.status === "BANNED") {
            return res.status(403).json({ message: "Access denied. User is banned." });
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
            referenceType: contentType.toUpperCase(), // Set reference type as either 'TUTORIAL' or 'BLOG'
            referenceId:content._id,    // Reference the ID of the related content
            userId: req.userId,         // Set from the authenticated user (verifyToken)
            isAccepted: false,          // Default status for new comments
            review,
            parentCommentId: parentCommentId || null // Set parentCommentId if it's a reply
        });

        if(newComment) {
        return res.status(200).json({ message: "Comment added successfully", newComment });
        }
        
    } catch (error) {
        console.error("Error during add comment: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }
};


exports.deleteComment = async (req, res) => {
    
    try {

        const {commentId} = req.params;

        // Check if commentId is a valid ObjectId
        if (!isValidObjectId(commentId)) {
            return res.status(422).json({ message: "Invalid comment ID." });
        }


        const deletedComment = await commentModel.findOneAndDelete({ _id: commentId});


        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        return res.status(200).json({ message: "Comment and its replies deleted successfully." });


        
    } catch (error) {
        console.error("Error deleting comment:", error.message);
        return res.status(500).json({message: "Internal server error."});
    }
    
};


exports.acceptComment = async (req, res) => {
    try {

        const {commentId} = req.params;

        // Check if commentId is a valid ObjectId
        if (!isValidObjectId(commentId)) {
            return res.status(422).json({ message: "Invalid comment ID." });
        }

        // Find the Comment by Id
        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        // Check if the comment is already accepted
        if (comment.isAccepted) {
            return res.status(409).json({ message: "Comment is already accepted." });
        }

        // Update status to accepted
        comment.isAccepted = true;
        await comment.save();

        return res.status(200).json({ message: "Comment accepted successfully.", comment });
        
    } catch (error) {
        console.error("Error accepting comment:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};


exports.rejectComment = async (req, res) => {
    try {

        const {commentId} = req.params;

        // Check if commentId is a valid ObjectId
        if (!isValidObjectId(commentId)) {
            return res.status(422).json({ message: "Invalid comment ID." });
        }

        // Find the Comment by Id
        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        // Check if the comment is already rejected
        if (!comment.isAccepted) {
            return res.status(409).json({ message: "Comment is already rejected." });
        }

        // Update status to reject
        comment.isAccepted = false;
        await comment.save();

        return res.status(200).json({ message: "Comment rejected successfully.", comment });
        
    } catch (error) {
        console.error("Error rejecting comment:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};


exports.getAllComments = async (req, res) => {
    try {

        // Fetch all main comments (no parentCommentId) and replies with parentCommentId populated
        const [ mainComments , replies] = await Promise.all([
            commentModel.find({parentCommentId: null}).populate("referenceId").populate([{ path: "userId", select: "-_id -password" }]).lean(),
            commentModel.find({parentCommentId: { $ne: null}}).populate("referenceId").populate([{ path: "userId", select: "-_id -password" }]).lean(),

        ]);

        const repliesMap = {}; // Create a map to store replies associated with each main comment's ID

        // Iterate through each reply and organize them by their parent comment's ID
        replies.forEach( reply => {
            const parentId = reply.parentCommentId.toString(); // Convert the parentCommentId to a string to use as a key in repliesMap
            
            // Initialize an array in repliesMap for this parentId if it doesn't exist
            if(!repliesMap[parentId]){              
                repliesMap[parentId] = [];
            }

            // Add the reply to the array of replies for this parentId
            repliesMap[parentId].push(reply);
        });

        // Combine main comments with their replies from repliesMap
        const commentsWithReplies = mainComments.map(mainComment => ({
            ...mainComment,
            // Attach replies from repliesMap, or an empty array if no replies are found for this main comment
            replies: repliesMap[mainComment._id.toString()] || []
        }));


        return res.status(200).json({ message: "All comment retrieved successfully",commentsWithReplies});
        
    } catch (error) {
        console.error("Error during retrieve all comments: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};

exports.addCommentToBlog = async (req, res) => {
    try {

        // Extract content type and ID from the request parameters
        const {contentId } = req.params;

        const contentType = req.path.includes("/tutorial/") ? "tutorial" : "blog";

        console.log(contentType, contentId);
        

        // Initialize variable to hold content (either tutorial or blog)
        let content;
        if (contentType.toUpperCase() === "TUTORIAL") {
            content = await tutorialModel.findById(contentId).lean(); // Use contentId directly
        } else if (contentType.toUpperCase() === "BLOG") {
            content = await blogModel.findById(contentId).lean(); // Use contentId directly
        }
        
        console.log(contentType.toUpperCase());
        

        // If the content is not found, return a 404 error
        if (!content) {
            return res.status(404).json({ message: `${contentType} not found.` });
        }

        // Validate the comment body using Joi validator
        const {error} = commentValidator.validate(req.body);
        if(error){
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Destructure comment fields from the request body
        const { body, review, parentCommentId} = req.body;
        

        // Verify if the user is banned
        const user = await userModel.findById(req.userId);
        if (!user || user.status === "BANNED") {
            return res.status(403).json({ message: "Access denied. User is banned." });
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
            referenceType: contentType.toUpperCase(), // Set reference type as either 'TUTORIAL' or 'BLOG'
            referenceId:content._id,    // Reference the ID of the related content
            userId: req.userId,         // Set from the authenticated user (verifyToken)
            isAccepted: false,          // Default status for new comments
            review,
            parentCommentId: parentCommentId || null // Set parentCommentId if it's a reply
        });

        if(newComment) {
        return res.status(200).json({ message: "Comment added successfully", newComment });
        }
        
    } catch (error) {
        console.error("Error during add comment: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }
};
