/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    body: {
        type: String,
        required: true,
        trim:true,
        mainLength: 5,
        maxLength:100
    },
    tutorialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorial",
        required: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    review: {
        type: Number,
        min: 1,
        max: 5
    },  
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        index: true
    }
}, {timestamps: true});


// Pre-hook to delete replies when a comment is deleted
CommentSchema.pre('findOneAndDelete', async function(next) {
    const commentId = this.getQuery()._id;
    await mongoose.model('Comment').deleteMany({ parentCommentId: commentId });
    next();
});


module.exports = mongoose.model("Comment", CommentSchema );