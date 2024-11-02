/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const {isValidObjectId} = require("mongoose");

// ----- Custom modules -----
const notificationModel = require("./../../models/notification_model");
const userModel = require("./../../models/user_model");
const notificationValidator = require("./../../validators/notification_validator");


exports.sendNotification = async (req, res) => {
  
    try {

        // Extract recipient details and notification data from request body
        const {recipientId, title, message, type } = req.body;

        // Retrieve senderId, set in token verification middleware
        const senderId = req.userId.toString();

        // Validate the notification details
        const { error } = notificationValidator.validate({ senderId, recipientId, title, message, type });
        if (error) {
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        const recipient = await userModel.findById(recipientId).lean();
        if(!recipient) {
            return res.status(404).json({ message: "No user found."});
        }

        // Create the notification in the database
        const notification = await notificationModel.create({
            senderId,
            recipientId,
            role : recipient.role,
            title,
            message,
            type,
            isRead: false
        });

        return res.status(201).json({ message: "Notification sent successfully", notification });
        
    } catch (error) {
        console.error("Error during sending notification: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};


exports.getAllNotification = async(req, res) => {
  
    try {

        const allNotifications = await notificationModel.find({}).lean();

        if(allNotifications.length === 0){
            return res.status(404).json({ message: "No notifications found."});
        }

        // Return tickets if found
        return res.status(200).json({ message: "All notification retrived successfully. :", allNotifications});
        
    } catch (error) {
        console.error("Error during retrive all notifications: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
};


exports.getUserNotifications = async (req, res) => {
  
    try {

        const recipientId = req.userId;

        const allUserNotifications = await notificationModel.find({ recipientId, role: "USER" }).lean();

        if(allUserNotifications.length === 0){
            return res.status(404).json({ message: "No notifications found."});
        }

        // Return tickets if found
        return res.status(200).json({ message: "All notification retrived successfully. :", allUserNotifications});
        
    } catch (error) {
        console.error("Error during retrieving user notifications:", error);
        return res.status(500).json({message: "Internal server error."});
    }
};


exports.markNotificationAsRead =async (req, res) => {

    try {
        const { notificationId } = req.params;
        
        // Validate notificationId
        if (!isValidObjectId(notificationId)) {
            return res.status(422).json({ message: "Invalid notification ID." });
        }

        // Update the `isRead` status of the notification
        const updatedNotification = await notificationModel.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ message: "Notification not found." });
        }

        return res.status(200).json({ message: "Notification marked as read.", updatedNotification });

    } catch (error) {
        console.error("Error during retrieving user notifications: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
    
};