/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/



"use strict";

// ----- Node modules -----
const Joi = require('joi');

// Regular expression to validate a MongoDB ObjectId (24 hexadecimal characters)
const objectIdPattern = /^[a-fA-F0-9]{24}$/;

const tutorialSchema = Joi.object( {

    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().max(500).required(),
    instructorId: Joi.string().required(),
    categoryId: Joi.string().pattern(objectIdPattern),
    href: Joi.string().required(),
    price: Joi.number().min(0).when('isFree', { is: true, then: Joi.optional() }),
    isFree: Joi.boolean().default(false),
    status: Joi.string().valid("COMPLETE", "INCOMPLETE").required(),
    onSale: Joi.boolean(),
    createdBy:Joi.string().pattern(objectIdPattern)
});

module.exports = tutorialSchema;