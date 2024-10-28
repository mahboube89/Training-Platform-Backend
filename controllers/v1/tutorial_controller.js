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
const tutorialModel = require('./../../models/tutorial_model');
const categoryModel = require('./../../models/category_model');
const userModel = require('./../../models/user_model');
const sectionModel = require('./../../models/section_model');
const tutorialValidator = require("./../../validators/tutorial_validator");
const sectionValidator = require("./../../validators/section_validator");

exports.getAllTutorials = async (req, res) => {
    
};


exports.createTutorial = async (req, res) => {
    try {


        // Validate the incoming request body using the tutorialValidator
        const { error } = tutorialValidator.validate(req.body);  // Joi validation returns an error object
        if (error) {
            // Delete uploaded file if validation fails
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "covers", req.file.filename));
            }
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Ensure cover file is present before accessing `req.file.filename`
        if (!req.file) {
            return res.status(400).json({ message: "Cover image is required." });
        }


        // Destructure required fields from request body
        const {title, description, instructorId, categoryId, href, price, isFree, status, onSale} = req.body;
        
        // Check for duplicate title in the same category
        const duplicateTutorial = await tutorialModel.findOne({ title, categoryId });
        if (duplicateTutorial) {
            // Delete uploaded file if duplicate is found
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "covers", req.file.filename));
            return res.status(409).json({ message: "A tutorial with this title already exists in the selected category." });
        }

        // Validate categoryId
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            // Delete uploaded file if duplicate is found
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "covers", req.file.filename));
            return res.status(404).json({ message: "Invalid category ID: category not found." });
        }

        // Validate instructor (assuming instructors are users with a specific role)
        const instructorExists = await userModel.findById(instructorId);
        if (!instructorExists) {
            // Delete uploaded file if duplicate is found
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "covers", req.file.filename));
            return res.status(404).json({ message: "Invalid instructor ID: instructor not found." });
        }
        
        const tutorial = await tutorialModel.create({
            title,
            description,
            instructorId,
            categoryId,
            href,
            price,
            isFree,
            status,
            onSale,
            cover: req.file.filename,
            createdBy: req.user._id // Automatically set createdBy from req.userId
        });

    
        const populatedTutorial = await tutorial.populate([
            { path: 'categoryId', select: '_id title' },        // Fetch title of the Category
            { path: 'instructorId', select: '_id name' }        // Fetch name of the Instructor
        ]);

        return res.status(201).json( {message: "Tutorial created successfully.", tutorial});
       

    } catch (error) {
        // Delete uploaded file if an error occurs during tutorial creation
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "covers", req.file.filename));
        }
        console.error("Error during tutorial creation: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};


exports.addSectionToTutorial = async(req,res) => {

    try {

        // Validate the tutorial ID
        if(!isValidObjectId(req.params.id)) {
            return res.status(422).json({ message: "Invalid tutorial ID."});
        } 
        
        // Check if the tutorial exists
        const tutorial = await tutorialModel.findById(req.params.id);
        if (!tutorial) {
            return res.status(404).json({ message: "Tutorial not found." });
        }

        // Validate the incoming request body using the sectionValidator
        const { error } = sectionValidator.validate(req.body);  // Joi validation returns an error object
        if (error) {
            // Delete uploaded file if validation fails
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "videos", req.file.filename));
            }
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        // Ensure cover file is present before accessing `req.file.filename`
        if (!req.file) {
            return res.status(400).json({ message: "Video is required." });
        }

        const {title, duration, isFree} = req.body;


        // Check for existing section with the same title and tutorialId
        const duplicateSection = await sectionModel.findOne({ title, tutorialId: req.params.id });
        if (duplicateSection) {
            // Delete the uploaded file since it's a duplicate
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "videos", req.file.filename));
            return res.status(409).json({ message: "A section with this title already exists for this tutorial." });
        }

        // Create section
        const section = await sectionModel.create({
            title,
            video: req.file.filename,
            duration,
            isFree,
            tutorialId: req.params.id
        });

        if(section) {
            return res.status(200).json({message: "Section created successfully."});
        }

    } catch (error) {

        // Delete file in case of any other errors
        if(req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "..", "public", "tutorials", "videos", req.file.filename));
        }

        console.error("Error during section addition: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};