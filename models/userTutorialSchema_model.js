/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');


const userTutorialSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tutorialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorial",
        required: true
    },
    price: {
        type: Number,
        required: function () {
            return this.price > 0; // Only required if price is greater than 0
        },
        default: 0 // Free tutorials have a default price of 0
    },
    progress: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

// Ensure unique entries for each user-tutorial pair
userTutorialSchema.index({ userId: 1, tutorialId: 1 }, { unique: true });

module.exports = mongoose.model("UserTutorial", userTutorialSchema)