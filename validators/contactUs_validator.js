/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/



"use strict";

// ----- Node modules -----
const Joi = require('joi');

// Define validation schema for contact form
const contactUsValidator = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().trim().required(),
    phone: Joi.string().pattern(/^(0|\+?[1-9]{1,3})\d{4,14}$/).optional(),
    hasResponse: Joi.boolean().default(false), // Can set a default in the model as well
    body: Joi.string().trim().min(5).max(500).required()
});

module.exports = contactUsValidator;
