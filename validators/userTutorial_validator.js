/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/



"use strict";

// ----- Node modules -----
const Joi = require('joi');

// Regular expression to validate a MongoDB ObjectId (24 hexadecimal characters)
const objectIdPattern = /^[a-fA-F0-9]{24}$/;


const userTutorialValidator = Joi.object({
    userId: Joi.string().pattern(objectIdPattern).required(),
    tutorialId: Joi.string().pattern(objectIdPattern).required(),
    price: Joi.number().min(0).default(0),
    progress: Joi.number().min(0).max(100).default(0)
});

module.exports = userTutorialValidator;