/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();

// ----- Custom modules -----
const verifyToken = require('../../middlewares/tokenVerify_middleware');
const checkAdmin = require('../../middlewares/checkAdmin_middleware');

const newsletterController = require("./../../controllers/v1/newsletter_controller");


// ----- Routes -----
router.route("/")
.get(verifyToken, checkAdmin, newsletterController.getAllNewsletter)
.post(newsletterController.addNewsletter);

module.exports = router;