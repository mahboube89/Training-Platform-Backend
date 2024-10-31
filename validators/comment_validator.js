/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/



"use strict";

// ----- Node modules -----
const Joi = require('joi');

// Regular expression to validate a MongoDB ObjectId (24 hexadecimal characters)
const objectIdPattern = /^[a-fA-F0-9]{24}$/;


const commentSchema = Joi.object({

    body: Joi.string().min(5).max(100).required(),
    tutorialHref: Joi.string().optional(), // Optional, used only for finding the tutorial
    referenceId: Joi.string().pattern(objectIdPattern),
    referenceType: Joi.string().valid("BLOG", "TUTORIAL"),
    userId: Joi.string().pattern(objectIdPattern),
    isAccepted: Joi.boolean().default(false),
    review: Joi.number().min(1).max(5).optional(),
    parentCommentId: Joi.string().pattern(objectIdPattern).optional(),
    
});

module.exports = commentSchema;