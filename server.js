/**
 * @Copyright 2024 mae-mahboube89
 * @license MI
*/

"use strict";


// ----- Node modules -----
const app = require('./app');           // Import the Express app from app.js
const mongoose = require('mongoose');   // Import Mongoose for MongoDB connection
require("dotenv").config();             // Load environment variables from the .env file

const port = process.env.PORT;          // Define the port number from the environment variables


// Immediately invoked async function to handle MongoDB connection
(async () => {

    try {

        // Connect to MongoDB using the URL from environment variables
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connected!"); 
        
    } catch (error) {

        console.error("Failed to connect to MongoDB", error);
        process.exit(1);  // Exit the process with an error code
    }

})();


// Start the server and listen on the specified port
app.listen(port , () => {
    console.log(`Server running on port ${port}.`);  
});
