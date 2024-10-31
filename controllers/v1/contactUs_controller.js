/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const {isValidObjectId} = require ("mongoose");
const nodemailer = require('nodemailer');

// ----- Custom modules -----
const contactUsModel = require("./../../models/contactUs_model");
const contactUsValidator = require("./../../validators/contactUs_validator");


exports.getAllTickets = async (req, res) => {

    try {

        const allTickets = await contactUsModel.find({}).select('name email phone body hasResponse').lean();

        // Check if any tickets exist
        if(allTickets === 0) {
            return res.status(404).json({ message: "No tickets found."});
        }

        // Return tickets if found
        return res.status(200).json({ message: "All tickets retrived successfully. :", allTickets});
        
    } catch (error) {
        console.error("Error during retrive all tickets: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
    
};


exports.addTicket = async (req, res) => {

    try {

        // Validate request body with validator
        const { error } = contactUsValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

        const {name, email, phone, body} = req.body;

        // Create new ticket in database
        const newTicket = await contactUsModel.create({
            name,
            email,
            phone,
            body,
            hasResponse: false
        });

        // Send response with created ticket
        if(newTicket) {
            return res.status(200).json({ message: "New Ticket added successfully. :",newTicket});
        }
        
    } catch (error) {
        console.error("Error during add a ticket: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
    
};


exports.deleteOneTicket = async (req, res) => {

    try {
        const {ticketId} = req.params;

        console.log(ticketId);
        
        

        // Check if the provided ticket ID is valid
        if (!isValidObjectId(ticketId)) {
            return res.status(422).json({ message: "Invalid ticket ID." });
        }

        // Attempt to find and delete the ticket
        const deletedTicket = await contactUsModel.findOneAndDelete({ _id: ticketId});

        if(!deletedTicket){
            return res.status(404).json({ message: "No ticket found." });
        }

        return res.status(200).json({ message: "Ticket removed successfully." });

    } catch (error) {
        console.error("Error during ticket removal: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
    
};


exports.answerTicket = async (req, res) => {

    try {

        const {email, answer} = req.body;

        // Check if ticket exists
        const findTicket = await contactUsModel.findOne( {email: email});
        if(!findTicket) {
            return res.status(404).json({ message: "No ticket found." });
        }

        // For more infos about nodemailer see : https://nodemailer.com/
        // Create nodemailer transporter with secure credentials
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "Admin-eamil@gmail.com",
                pass: "your password in app password in google account in security"
            }
        });

        // Email content
        const responseDetails = {
            from: "Admin-eamil@gmail.com",
            to: email,
            subject: "Answer to your ticket",
            text: answer
        };
        
        // Send email and update ticket response status
        transporter.sendMail(responseDetails, async(error, info) => {
            if(error) {
                return res.json({message: "Error during email sending: ", error});
            }

            // Mark ticket as responded in the database
            findTicket.hasResponse = true;
            await findTicket.save();

            return res.json({message: "Emmail sent successfully, ticket updated."});
        });

    } catch (error) {
        console.error("Error in answering ticket:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
    
};
