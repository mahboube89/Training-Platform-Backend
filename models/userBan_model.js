/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');


// ----- Mongoose schema for user data -----
const BanUserSchema = new mongoose.Schema({    
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    }
}, {timestamps: true});


module.exports = mongoose.model("BanUser", BanUserSchema);