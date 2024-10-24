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
// const checkAdmin = require('./../../middlewares/checkAdmin_middleware');


router.post("/ban/:id", userController.banUser );


module.exports = router;