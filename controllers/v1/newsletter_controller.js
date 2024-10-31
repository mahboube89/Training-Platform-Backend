/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----

// ----- Custom modules -----
const newsletterModel = require("./../../models/newsletter_model");



exports.getAllNewsletter = async (req, res) => {

    try {

        // Retrieve all newsletter
        const allNewsletters = await newsletterModel.find({}).lean();

        // Check if no newsletter are found
        if(allNewsletters.length === 0) {
            return res.status(404).json({message: "No newsletter found."});
        }

        return res.status(200).json({message: "All newsletter retrieved successfully.", allNewsletters});
        
    } catch (error) {
        console.error("Error during retrive all newsletters: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
    
};


exports.addNewsletter = async (req, res) => {

    try {
        
        const {email} = req.body;

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(422).json({ message: "Invalid email format." });
        }

        // Check if email already exists
        const existingMember = await newsletterModel.findOne({ email });
        if (existingMember) {
            return res.status(409).json({ message: "Email is already subscribed to the newsletter." });
        }

        // Add new member to the newsletter
        const newMember = await newsletterModel.create({ email });
        return res.status(201).json({ message: "Successfully subscribed to the newsletter.", newMember });


    } catch (error) {
        console.error("Error during add a newsletter: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
    
};