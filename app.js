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
const newsletterRouter = require('./routes/v1/newsletter_route');
const searchRouter = require('./routes/v1/search_route');
const notificationRouter = require('./routes/v1/notification_route');
const blogRouter = require('./routes/v1/blog_route');
const menuRouter = require('./routes/v1/menu_router');


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

// Contact us routes under /v1/contact
app.use("/v1/contact", contactUsRouter);

// Newsletter routes under /v1/newsletter
app.use("/v1/newsletter", newsletterRouter);

// Search routes under /v1/search
app.use("/v1/search", searchRouter);

// Notification routes under /v1/notification
app.use("/v1/notification", notificationRouter);

// Blog routes under /v1/blog
app.use("/v1/blog", blogRouter);

// Menus routes under /v1/menus
app.use("/v1/menus", menuRouter);




module.exports = app;