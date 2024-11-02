/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";


// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const authController = require('./../../controllers/v1/auth_controller');
const sanitizeInputs = require('./../../middlewares/sanitize_middleware');
const loginLimiter = require('./../../middlewares/rateLimiter');


// ----- Authentication Routes -----

// Register a new user with sanitized inputs (Public) 
// POST     http://localhost:4000/v1/auth/register
router.post("/register",sanitizeInputs, authController.register);


// Log in an existing user with input sanitization and rate limiting (Public)
// POST     http://localhost:4000/v1/auth/login
router.post("/login", loginLimiter, sanitizeInputs, authController.login);



module.exports = router;