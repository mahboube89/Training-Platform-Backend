/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const verifyToken = require('./../../middlewares/tokenVerify_middleware');
const checkAdmin = require('./../../middlewares/checkAdmin_middleware');
const notificationController = require("./../../controllers/v1/notification_controller");



// ----- Notification Routes -----


// Admin sends a notification to a specific user (Protected, Admin only)
// POST    http://localhost:4000/v1/notification/send
router.route("/send").post(verifyToken, checkAdmin, notificationController.sendNotification);


// Admin retrieves all notifications in the system (Protected, Admin only)
// GET    http://localhost:4000/v1/notification
router.route("/").get(verifyToken, checkAdmin, notificationController.getAllNotification);


// Any user retrieves their own notifications (Protected)
// GET    http://localhost:4000/v1/notification/user
router.route("/user").get(verifyToken, notificationController.getUserNotifications);


// User marks a specific notification as read (Protected)
// PATCH    http://localhost:4000/v1/notification/:notificationId/read
router.route("/:notificationId/read")
.patch(verifyToken, notificationController.markNotificationAsRead);



module.exports = router;