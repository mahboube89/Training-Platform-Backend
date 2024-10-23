/**
 * @Copyright 2024 mae-mahboube89
 * @license MI
*/

"use strict";


// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const authController = require('../../controllers/v1/auth_controller');


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getMe);


module.exports = router;