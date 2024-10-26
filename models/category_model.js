/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');
const { isLowercase } = require('validator');


// ----- Mongoose schema for category -----
const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
        lowercase: true
    },
    href: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 4,
        maxLength: 30,
        lowercase: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Category", CategorySchema);