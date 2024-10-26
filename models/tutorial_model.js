/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');
const { schema } = require('./user_model');

const TutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    cover: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    href: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["Compelete", "Incomplete"],
        required: true
    },
    onSale: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});


// Virtual for Sections linked to the tutorial
TutorialSchema.virtual("sections", {
    ref: "Section",
    localField: "_id",
    foreignField: "tutorialId"
});


// Virtual for Comments linked to the tutorial
schema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "tutorialId"
});

module.exports = mongoose.model("Tutorial", TutorialSchema);