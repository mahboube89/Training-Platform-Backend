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


// ----- Blog Routes -----

// Create a Blog Post (Admin or Author Only)
// POST     http://localhost:4000/v1/blog
router.route("/").post(verifyToken, checkRole("ADMIN", "AUTHOR"),blogController.createBlogPost);


// Get All Blog Posts (Public)
// GET      http://localhost:4000/v1/blog
router.route("/").get(blogController.getAllBlogPosts);


// Edit a Blog Post (Admin or Author Only)
// PUT      http://localhost:4000/v1/blog/:blogId
router.route("/:blogId").put(verifyToken, checkRole("ADMIN", "AUTHOR"),blogController.editBlogPost);


// Get Single Blog Post by blog slug (Public)
// GET      http://localhost:4000/v1/blog/:slug
router.route("/:slug").get(blogController.getSingleBlogPost);



module.exports = router;
