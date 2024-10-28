/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLenght: 5,
        maxLenght: 100
    },
    video: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    isFree: {
        type: Boolean,
        required: true,
        default: false
    },
    tutorialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorial",
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Section", SectionSchema)