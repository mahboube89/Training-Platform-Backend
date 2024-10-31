/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express'); // Import Express framework
const cors = require('cors');
const path = require('path');


// ----- Custom modules -----
const authRouter = require('./routes/v1/auth_route');
const userRouter = require('./routes/v1/user_route');
const categoryRouter = require('./routes/v1/category_route');
const tutorialRouter = require('./routes/v1/tutorial_route');
const commentRouter = require('./routes/v1/comment_route');
const contactUsRouter = require('./routes/v1/contactUs_route');


// ----- Initial express -----
const app = express();


// ----- Middleware -----

// Serve static files for course covers (e.g., images)
app.use("/cources/covers", express.static(path.join(__dirname, "public", "tutorials", "cover")));

// Enable CORS for handling cross-origin requests
app.use(cors());

// Parse incoming JSON requests (replaces bodyParser.json())
app.use(express.json());

// Parse URL-encoded form data (replaces bodyParser.urlencoded())
app.use(express.urlencoded({ extended: true}));


// ----- Routes -----

// Authentication routes under /v1/auth
app.use("/v1/auth", authRouter);

// User routes under /v1/users
app.use("/v1/users", userRouter);

// Category routes under /v1/category
app.use("/v1/category", categoryRouter);

// Tutorial routes under /v1/tutorial
app.use("/v1/tutorial", tutorialRouter);

// Tutorial routes under /v1/comments
app.use("/v1/comments", commentRouter);


app.use("/v1/contact", contactUsRouter);



module.exports = app;