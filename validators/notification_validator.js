/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

const Joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/; // Regular expression for MongoDB ObjectId

const notificationValidator = Joi.object({

    senderId: Joi.string().pattern(objectIdPattern).required(),

    recipientId: Joi.string().pattern(objectIdPattern).required(),

    role: Joi.string().valid("USER", "INSTRUCTOR").optional(),

    title: Joi.string().trim().max(100).required(),

    message: Joi.string().trim().required(),
        
    isRead: Joi.boolean().default(false),

    type: Joi.string().valid("SYSTEM", "ANNOUNCEMENT", "ALERT", "REMINDER").default("SYSTEM")
        
});

module.exports = notificationValidator;

