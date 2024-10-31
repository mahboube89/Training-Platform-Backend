/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');


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
    instructorId: {
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
        required: function() {return !this.isFree; },
        min: 0
    },
    isFree: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["COMPLETE", "INCOMPLETE"],
        required: true
    },
    onSale: {
        type: Boolean,
        default: false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {timestamps: true});


// Add unique compound index on title and categoryId
TutorialSchema.index({ title: 1, categoryId: 1 }, { unique: true });


// Virtual for Sections linked to the tutorial
TutorialSchema.virtual("sections", {
    ref: "Section",
    localField: "_id",
    foreignField: "tutorialId"
});


// Virtual for Comments linked to the tutorial
TutorialSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "referenceId"
});

module.exports = mongoose.model("Tutorial", TutorialSchema);