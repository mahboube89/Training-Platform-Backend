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



// ----- Newsletter Routes -----


// Retrieve all newsletter subscribers (Protected, Admin only)
// GET http://localhost:4000/v1/newsletter
router.route("/")
.get(verifyToken, checkAdmin, newsletterController.getAllNewsletter)

// Add a new email subscription to the newsletter (Public)
// POST http://localhost:4000/v1/newsletter
.post(newsletterController.addNewsletter);



module.exports = router;