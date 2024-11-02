/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const validator = require('fastest-validator');

// ----- Define user registration schema -----
const categoryValidator = new validator();

const createCategorySchema = {
    title: {type: "string", min: 3, max: 30, optional: false, messages: {
        stringMin: "Title must be at least 3 characters long",
        stringMax: "Title must be no longer than 30 characters"
    }},
    slug: {type: "string", min: 4, max: 30, messages: {
        stringMin: "Name must be at least 4 characters long",
        stringMax: "Name must be no longer than 30 characters"
    } },
    $$strict: true, // Ensures no additional fields are accepted
};


const updateCategorySchema = {
    title: {type: "string", min: 3, max: 30, optional: true, messages: {
        stringMin: "Title must be at least 3 characters long",
        stringMax: "Title must be no longer than 30 characters"
    }},
    slug: {type: "string", min: 4, max: 30, optional: true, messages: {
        stringMin: "Name must be at least 4 characters long",
        stringMax: "Name must be no longer than 30 characters"
    } },
    $$strict: true, // Ensures no additional fields are accepted
};



// Compile the validation schema
const validateCreateCategory = categoryValidator.compile(createCategorySchema);
const validateUpdateCategory = categoryValidator.compile(updateCategorySchema);

module.exports = {validateCreateCategory, validateUpdateCategory };