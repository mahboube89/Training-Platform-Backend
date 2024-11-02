/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const mongoose = require('mongoose');


const MenuSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minLenght: 5,
        maxLenght: 20
    },
    path: {
        type: String,
        trim: true,
        unique: true
    },
    order:{
        type: Number,
        default: 0
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu", // Self-referencing for submenus
        default: null 
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, {timestamps: true});


module.exports = mongoose.model("Menu", MenuSchema);