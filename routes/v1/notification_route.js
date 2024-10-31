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

// ----- Routes -----

// Admin sends a notification to a specific user
router.route("/send").post(verifyToken, checkAdmin, notificationController.sendNotification);

// Admin retrieves all notifications in the system
router.route("/").get(verifyToken, checkAdmin, notificationController.getAllNotification);

// Any user retrieves their own notifications
router.route("/user").get(verifyToken, notificationController.getUserNotifications);

router.route("/:notificationId/read")
.patch(verifyToken, notificationController.markNotificationAsRead);


module.exports = router;