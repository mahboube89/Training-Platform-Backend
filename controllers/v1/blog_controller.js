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
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
            }

            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Ensure cover file is present before accessing `req.file.filename`
        if (!req.file) {
            return res.status(400).json({ message: "Cover image is required." });
        }
       
        const {title, description, content, authorId, categoryId, tags } = req.body;

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

        // Create a new blog entry
        const blog = await blogModel.create({
            title,
            description,
            content,
            authorId: req.userId,
            categoryId,
            tags: tags || [],
            coverImage: req.file.filename,
            isPublished: false,
            slug
        });

        // Populate related fields for response
        const populatedBlog = await blog.populate([
            { path: 'categoryId', select: '_id title' },        // Fetch title of the Category
            { path: 'authorId', select: '_id username' }        // Fetch name of the Instructor
        ]);

        return res.status(201).json( {message: "Blog created successfully.", populatedBlog});
 
    } catch (error) {

        // Delete uploaded file if an error occurs
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
        }
        console.error("Error during blog creation: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};

exports.getAllBlogPosts = async (req, res) => {
  
    try {

        // Retrieve all blog posts and populate related fields
        const AllBlogPosts = await blogModel.find({})
        .populate([{ path: 'authorId', select: '_id username' },{ path: 'categoryId', select: '_id title' } ])
        .lean();

        if(!AllBlogPosts){
            return res.status(404).json( {message: "No Blog found."});
        }

        return res.status(200).json( {message: "All blogs retrieved successfully." , AllBlogPosts});
        
    } catch (error) {
        console.error("Error during retrieving all blogs: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};


exports.getSingleBlogPost = async (req, res) => {
  
    try {

        const {slug} = req.params;

        // Find a blog post by its slug and populate related fields
        const blogPost = await blogModel.findOne({ slug: slug})
        .populate([{ path: 'authorId', select: '_id username' },{ path: 'categoryId', select: '_id title' } ])
        .lean();

        if(!blogPost){
            return res.status(404).json( {message: "Blog not found."});
        }

        return res.status(200).json( {message: "Blog retrieved successfully." , blogPost});

    } catch (error) {
        console.error("Error during get the blog: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }
};


exports.editBlogPost = async (req, res) => {
    try {
        const {blogId} = req.params;
        
        // Check if blogId is a valid ObjectId
        if (!isValidObjectId(blogId)) {
            return res.status(422).json({ message: "Invalid blog ID." });
        }

        // Fetch existing blog post to validate and get current data
        const existingBlog = await blogModel.findById(blogId);
        if(!existingBlog){
            return res.status(404).json({ message: "Blog not found." });
        }

        // Validate partial blog update details
        const { error } = blogValidator.validate(req.body, { presence: "optional" });
        if (error) {
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
            }
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Fields to update
        const { title, description, content, categoryId, tags } = req.body;

        // Handle slug update if title is changed
        if (title && title !== existingBlog.title) {
            let slug = generateSlug(title);
            let slugExists = await blogModel.findOne({ slug });
            let suffix = 1;
            while (slugExists) {
                slug = generateSlug(title) + '-' + suffix;
                slugExists = await blogModel.findOne({ slug });
                suffix += 1;
            }
            existingBlog.slug = slug;
            existingBlog.title = title;
        }

        // Handle category validation if updated
        if (categoryId && categoryId !== existingBlog.categoryId) {
            const categoryExists = await categoryModel.findById(categoryId);
            if (!categoryExists) {
                if (req.file) {
                    fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
                }
                return res.status(404).json({ message: "Invalid category ID: category not found." });
            }
            existingBlog.categoryId = categoryId;
        }

        // Update other fields if they are present in the request
        if (description) existingBlog.description = description;
        if (content) existingBlog.content = content;
        if (tags) existingBlog.tags = tags;
        if (typeof isPublished !== "undefined") existingBlog.isPublished = isPublished;

        // Handle cover image update if a new file is uploaded
        if (req.file) {
            // Remove the old cover image
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", existingBlog.coverImage));
            // Update cover image with new file name
            existingBlog.coverImage = req.file.filename;
        }

        // Save updated blog post
        const updatedBlog = await existingBlog.save();

        // Populate references for response
        const populatedBlog = await updatedBlog.populate([
            { path: 'categoryId', select: '_id title' },
            { path: 'authorId', select: '_id username' }
        ]);

        return res.status(200).json({ message: "Blog updated successfully.", populatedBlog });

        
    } catch (error) {

        // Delete uploaded file if an error occurs
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "blogs", "covers", req.file.filename));
        }

        console.error("Error during editting blog: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};


