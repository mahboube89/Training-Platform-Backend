/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const validator = require('fastest-validator');

// ----- Define user registration schema -----
const userValidator = new validator();

const schema = {
    firstname: {type: "string", min: 3, max: 50, optional: true},
    lastname: {type: "string", min: 3, max: 50, optional: true},
    username: {type: "string", min: 4, max: 30 },
    email: {type: "email"},
    password: {type: "string", min: 8},
    confirmPassword : {type: "equal", field: "password"},
    $$strict: true,
};

// Compile the validation schema
const check = userValidator.compile(schema);

module.exports = check;