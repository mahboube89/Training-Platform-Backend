/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,       
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone:{
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"]
    },
    isAnswered: {
        type: Boolean,
        default: false,
        index: true
    },
    body: {
        type: String,
        required: true,
        trim:true,
        mainLength: 5,
        maxLength:500
    }
}, {timestamps: true});

module.exports = mongoose.model("ContactUs", contactUsSchema);
