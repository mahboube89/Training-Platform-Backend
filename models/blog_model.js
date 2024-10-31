/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tags: [{
        type: String,
        trim: true,
        maxLength: 50
    }],
    coverImage: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

// Virtual for Comments linked to the blog
BlogSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "referenceId"
});

module.exports = mongoose.model("Blog", BlogSchema);
