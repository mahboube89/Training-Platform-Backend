/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Custom modules -----
const categoryModel = require("./../../models/category_model");
const categoryValidator = require("./../../validators/category_validator");

exports.createCategory = async(req, res) => {
    try {

        // Validate incoming request body using the custom validator
        const isBodyValid = categoryValidator(req.body);   
        if(isBodyValid !== true) {
            return res.status(422).json({errors: isBodyValid});
        }

        // Destructure validated fields from request body
        const {title, href} = req.body;

        // Attempt to create the category
        const category = await categoryModel.create( {title , href});
        if(!category) {
            return res.status(500).json({message: "Category creation failed."});
        }

        // Return success response with the created category
        return res.status(201).json({message: "Category created successfully."})

    } catch (error) {

        // Handle duplicate entry error for unique fields
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(409).json({ message: `Category with this ${duplicateField} already exists.`});
        }
        console.error("Error during create a category: ", error.message);
        return res.status(500).json({message: "Internal server error.", category});
    }
};


exports.getAllCategory = async(req, res) => {
    try {
        // Retrieve all categories
        const categories = await categoryModel.find({});

        // Check if no categories are found
        if(categories.length === 0) {
            return res.status(404).json({message: "No categories found."});
        }

        return res.status(200).json({message: "All categories retrieved successfully." , categories});
        
    } catch (error) {
        console.error("Error during get all categories: ", error.message);
        return res.status(500).json({message: "Internal server error.", category});
    }

};


exports.removeCategory = async (req, res) => {};


exports.updateCategory = async (req, res) => {};

