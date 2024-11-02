/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/



"use strict";

// ----- Node modules -----
const Joi = require('joi');

// Regular expression to validate a MongoDB ObjectId (24 hexadecimal characters)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const menuValidator = Joi.object({
    title: Joi.string()
        .trim()
        .min(5)
        .max(20)
        .required(),

    path: Joi.string()
        .trim(),

    order: Joi.number()
        .integer()
        .min(0)
        .default(0),

    parentId: Joi.string()
        .pattern(objectIdPattern)
        .allow(null)
        .optional(),

    categoryId: Joi.string()
        .pattern(objectIdPattern)
        .allow(null)
        .required()
});

module.exports = menuValidator;