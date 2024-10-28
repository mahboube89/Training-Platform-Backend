/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/



"use strict";

// ----- Node modules -----
const Joi = require('joi');

// Regular expression to validate a MongoDB ObjectId (24 hexadecimal characters)
const objectIdPattern = /^[a-fA-F0-9]{24}$/;

const sectionSchema = Joi.object({

    title: Joi.string().min(5).max(100).required(),
    video: Joi.string(),
    duration: Joi.number().integer().min(1).required(),
    isFree: Joi.boolean().default(false),
    tutorialId: Joi.string().pattern(objectIdPattern)
});

module.exports = sectionSchema;