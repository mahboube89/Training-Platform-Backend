/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const validator = require('fastest-validator');

// ----- Define user registration schema -----
const categoryValidator = new validator();

const schema = {
    title: {type: "string", min: 3, max: 30, optional: false, messages: {
        stringMin: "Title must be at least 3 characters long",
        stringMax: "Title must be no longer than 30 characters"
    }},
    href: {type: "string", min: 4, max: 30, optional: false, messages: {
        stringMin: "Name must be at least 4 characters long",
        stringMax: "Name must be no longer than 30 characters"
    } },
    $$strict: true, // Ensures no additional fields are accepted
};

// Compile the validation schema
const check = categoryValidator.compile(schema);

module.exports = check;