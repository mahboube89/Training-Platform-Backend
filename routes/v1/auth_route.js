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


router.post("/register",sanitizeInputs, authController.register);
router.post("/login",sanitizeInputs, authController.login);
router.get("/me", authController.getMe);


module.exports = router;