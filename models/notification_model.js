/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

const mongoose = require('mongoose');


const NotificationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
        index: true 
    },
    recipientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
        index: true 
    },
    role: {
        type: String,
        enum: ["USER", "INSTRUCTOR"],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    message: { 
        type: String, 
        required: true, 
        trim: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    type: { 
        type: String, 
        enum: ["SYSTEM", "ANNOUNCEMENT", "ALERT", "REMINDER"], 
        default: "SYSTEM" 
    }
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
