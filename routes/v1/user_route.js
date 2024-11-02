/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();

// ----- Custom modules -----
const userController = require('./../../controllers/v1/user_controller');
const verifyToken = require('./../../middlewares/tokenVerify_middleware');
const checkAdmin = require('./../../middlewares/checkAdmin_middleware');
const sanitizeInputs = require('./../../middlewares/sanitize_middleware');



// ----- User Routes -----


// Retrieve all users (Restricted to ADMIN)
// GET http://localhost:4000/v1/users
router.route("/")
.get(verifyToken, checkAdmin, userController.getAllUsers)

// Update user information (Authenticated users only, with input sanitization)
// PUT http://localhost:4000/v1/users
.put(verifyToken, sanitizeInputs, userController.updateUserInfos);


// Remove a specific user (Restricted to ADMIN)
// DELETE http://localhost:4000/v1/users/:id
router.route("/:id")
.delete(verifyToken, checkAdmin, userController.removeUser);


// Ban a specific user (Restricted to ADMIN)
// POST http://localhost:4000/v1/users/ban/:id
router.route("/ban/:id")
.post(verifyToken, checkAdmin, userController.banUser);


// Change a user's role to "Author" (Restricted to ADMIN)
// PUT http://localhost:4000/v1/users/role
router.route("/role")
.put(verifyToken, checkAdmin, userController.makeAuthor);



module.exports = router;