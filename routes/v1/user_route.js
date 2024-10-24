/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();

// ----- Custom modules -----
const userController = require('./../../controllers/v1/user_controller');
const verifyToken = require('./../../middlewares/tokenVerify_middleware');
const checkAdmin = require('./../../middlewares/checkAdmin_middleware');



// ----- Routes -----

// Get all users
router.route("/")
.get(verifyToken, checkAdmin, userController.getAllUsers);

// Ban a user - Admin
router.route("/ban/:id")
.post(verifyToken, checkAdmin, userController.banUser);


module.exports = router;