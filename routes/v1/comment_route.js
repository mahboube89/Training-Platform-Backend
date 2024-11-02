/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const verifyToken = require('../../middlewares/tokenVerify_middleware');
const checkAdmin = require('../../middlewares/checkAdmin_middleware');

const commentController = require('../../controllers/v1/comment_controller');



// ----- Comment Routes -----


// Retrieve all comments (Protected, Admin only)
// G    http://localhost:4000/v1/comments
router.route("/").get(verifyToken,checkAdmin, commentController.getAllComments);


// Add a new comment to a tutorial (Protected)
// P    http://localhost:4000/v1/comments/:contentId/tutorial/comments
router.route("/:contentId/tutorial/comments").post(verifyToken, commentController.addCommentToTutorial);


// Add a new comment to a blog (Protected)
// P    http://localhost:4000/v1/comments/:contentId/blog/comments
router.route("/:contentId/blog/comments").post(verifyToken, commentController.addCommentToBlog);


// Delete an existing comment by comment ID (Protected, Admin only)
// DELET    http://localhost:4000/v1/comments/:commentId
router.route("/:commentId").delete(verifyToken, checkAdmin, commentController.deleteComment );


// Accept a comment (set as approved) by comment ID (Protected, Admin only)
// PATCH    http://localhost:4000/v1/comments/:commentId/accept
router.route("/:commentId/accept").patch(verifyToken, checkAdmin, commentController.acceptComment );


// Reject a comment (set as not approved) by comment ID (Protected, Admin only)
// PATCH    http://localhost:4000/v1/comments/:commentId/reject
router.route("/:commentId/reject").patch(verifyToken, checkAdmin, commentController.rejectComment );



module.exports = router;