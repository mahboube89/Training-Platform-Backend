/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');


// ----- Mongoose schema for user data -----
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        minLength: 4,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER", "INSTRUCTOR"],
        default: "USER"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "BANNED"],
        default: "ACTIVE"
    }
}, {timestamps: true});


module.exports = mongoose.model("User", UserSchema);