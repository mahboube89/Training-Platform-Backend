/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const validator = require('validator');


const sanitizeInputs = (req, res, next) => {

    if (req.body.username) req.body.username = validator.escape(req.body.username);
    if (req.body.email) req.body.email = validator.normalizeEmail(req.body.email);
    if (req.body.firstname) req.body.firstname = validator.escape(req.body.firstname);
    if (req.body.lastname) req.body.lastname = validator.escape(req.body.lastname);

    next(); // Pass control to the next middleware/controller
};

module.exports = sanitizeInputs;