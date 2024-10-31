/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const fs = require('fs');
const path = require('path');
const {isValidObjectId} = require ("mongoose");

// ----- Custom modules -----
const blogModel = require("./../../models/blog_model");
const categoryModel = require('./../../models/category_model');
const blogValidator = require("./../../validators/blog_validator");
const { generateSlug } = require("./../../utils/slugGenerator-util");


exports.createBlogPost = async (req, res) => {
  
    try {
        
        // Validate the blog details
        const { error } = blogValidator.validate(req.body);
        if (error) {

            // Delete uploaded file if validation fails
            // if (req.file) {
            //     fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
            // }

            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Ensure cover file is present before accessing `req.file.filename`
        // if (!req.file) {
        //     return res.status(400).json({ message: "Cover image is required." });
        // }

        const {title, description, content, authorId, categoryId, tags, isPublished } = req.body;

        // Validate categoryId
        const categoryExist = await categoryModel.findById(categoryId);
        if (!categoryExist) {
            // Delete uploaded file if duplicate is found
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
            return res.status(404).json({ message: "Invalid category ID: category not found." });
        }

        // Check if a blog with the same title or slug already exists
        const existingBlog = await blogModel.findOne({ title });
        if (existingBlog) {
            return res.status(409).json({ message: "A blog with this title already exists." });
        }

        // Generate initial slug
        let slug = generateSlug(title);

        // Check for slug uniqueness
        let slugExists = await blogModel.findOne({ slug });
        let suffix = 1;
        while (slugExists) {
            slug = generateSlug(title) + '-' + suffix;
            slugExists = await blogModel.findOne({ slug });
            suffix += 1;
        }

        const blog = await blogModel.create({
            title,
            description,
            content,
            authorId: req.userId,
            categoryId,
            tags: tags || [],
            coverImage: "cover.png",
            isPublished: false,
            slug,
            // coverImage: req.file.filename
        });

        const populatedBlog = await blog.populate([
            { path: 'categoryId', select: '_id title' },        // Fetch title of the Category
            { path: 'authorId', select: '_id username' }        // Fetch name of the Instructor
        ]);

        return res.status(201).json( {message: "Blog created successfully.", populatedBlog});
 
    } catch (error) {

        // if (req.file) {
        //     fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
        // }
        console.error("Error during blog creation: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};

exports.getAllBlogPosts = async (req, res) => {
  
    try {
        
    } catch (error) {
        console.error("Error during retrieving all blogs: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};

exports.editBlogPost = async (req, res) => {
  
    try {
        
    } catch (error) {
        console.error("Error during editting blog: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};

exports.getSingleBlogPost = async (req, res) => {
  
    try {
        
    } catch (error) {
        console.error("Error during get the blog: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }
};

exports.addCommentToPost = async (req, res) => {
  
    try {
        
    } catch (error) {
        console.error("Error during comment addition to blog: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }
};

