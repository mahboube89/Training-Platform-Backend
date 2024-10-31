/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

const Joi = require('joi');

const blogModel = require("./../models/blog_model");

// Regular expression for MongoDB ObjectId
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// Blog Validator Schema
const blogValidator = Joi.object({
    title: Joi.string()
        .max(150)
        .required(),

    description: Joi.string()
        .max(500)
        .required(),

    content: Joi.string()
        .required(),

    authorId: Joi.string()
        .pattern(objectIdPattern)
        .optional(),

    categoryId: Joi.string()
        .pattern(objectIdPattern),

    tags: Joi.array()
        .items(Joi.string().trim().max(50))
        .optional(),

    coverImage: Joi.string(),

    isPublished: Joi.boolean()
        .default(false),

    views: Joi.number()
        .integer()
        .min(0)
        .default(0),

    likes: Joi.number()
        .integer()
        .min(0)
        .default(0),

    slug: Joi.string()
        .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(100)

});


module.exports = blogValidator;

