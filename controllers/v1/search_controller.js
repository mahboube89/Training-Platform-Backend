/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----

// ----- Custom modules -----
const tutorialModel = require("./../../models/tutorial_model");


// ----- Helper function -----

// Helper function to escape special characters in the search keyword for regex
const escapeRegex = (keyword) => {
    return keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special regex characters
};


exports.findKeywordGlobal = async (req, res) => {

    try {

        const {keyword} = req.params;

        // Validate the keyword length to avoid searches with empty or very short terms
        if (!keyword || keyword.length < 3) {
            return res.status(400).json({ message: "Search keyword must be at least 3 characters long." });
        }

        // Escape any special characters in the keyword to safely use it in regex
        const escapedKeyword = escapeRegex(keyword);

        // Perform the search with case-insensitive regex in title and description fields
        const results = await tutorialModel.find({
            $or: [
                { title: { $regex: ".*" + escapedKeyword + ".*", $options: 'i' } },
                { description: { $regex: ".*" + escapedKeyword + ".*", $options: 'i' } }
            ]
        }).select("title description"); // Limits returned fields to title and description

        // Return a 404 response if no results were found
        if (results.length === 0) {
            return res.status(404).json({ message: "Search results retrieved successfully.", results});
        }

        // Return the successful search results
        return res.status(200).json({message: "", results});
        
    } catch (error) {
        console.error("Error during search: ", error.message);
        return res.status(500).json({message: "Internal server error.", category});
    }  
};