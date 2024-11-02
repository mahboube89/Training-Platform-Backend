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



// ----- Contact us Routes -----


// Retrieve all contact tickets (Protected, Admin only)
// GET    http://localhost:4000/v1/contact
router.route("/")
.get(verifyToken, checkAdmin, contactUsController.getAllTickets)


// Submit a new contact ticket (Public)
// POST    http://localhost:4000/v1/contact
.post(contactUsController.addTicket);


// Delete a specific contact ticket by ticket ID (Protected, Admin only)
// DELETE    http://localhost:4000/v1/contact/:ticketId
router.route("/:ticketId")
.delete(verifyToken, checkAdmin, contactUsController.deleteOneTicket);


// Delete a specific contact ticket by ticket ID (Protected, Admin only)
// DELETE    http://localhost:4000/v1/contact/:ticketId
router.route("/answer")
.post(verifyToken, checkAdmin, contactUsController.answerTicket);


module.exports = router;