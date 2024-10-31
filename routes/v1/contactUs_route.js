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

const contactUsController = require("./../../controllers/v1/contactUs_controller");



// ----- Routes -----
router.route("/")
.get(verifyToken, checkAdmin, contactUsController.getAllTickets)
.post(contactUsController.addTicket);


router.route("/:ticketId")
.delete(verifyToken, checkAdmin, contactUsController.deleteOneTicket);


router.route("/answer")
.post(verifyToken, checkAdmin, contactUsController.answerTicket);


module.exports = router;