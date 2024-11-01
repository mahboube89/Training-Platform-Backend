/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const verifyToken = require('./../../middlewares/tokenVerify_middleware');
const checkRole = require('./../../middlewares/checkRole_middleware');
const blogController = require("./../../controllers/v1/blog_controller");

// ----- Routes -----

// Create a Blog Post (Admin or Author Only)
router.route("/").post(verifyToken, checkRole("ADMIN", "AUTHOR"),blogController.createBlogPost);


// Get All Blog Posts (Public)
router.route("/").get(blogController.getAllBlogPosts);


// Edit a Blog Post (Admin or Author Only)
router.route("/:blogId").put(verifyToken, checkRole("ADMIN", "AUTHOR"),blogController.editBlogPost);


// Get Single Blog Post by Slug (Public)
router.route("/:slug").get(blogController.getSingleBlogPost);




module.exports = router;
