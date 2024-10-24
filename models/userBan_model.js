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
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    bannedBy: {
        type: String,
        required: true, 
        trim: true
    },
    isPermanent: {
        type: Boolean,
        default: true 
    },
    banExpiresAt: {
        type: Date,
        default: null 
    }
}, {timestamps: true});


module.exports = mongoose.model("BanUser", BanUserSchema);