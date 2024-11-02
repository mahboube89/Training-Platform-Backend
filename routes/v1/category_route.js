/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";


// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const categoryController = require('./../../controllers/v1/category_controller');
const verifyToken = require('./../../middlewares/tokenVerify_middleware');
const checkAdmin = require('./../../middlewares/checkAdmin_middleware');
const sanitizeInputs = require('./../../middlewares/sanitize_middleware');


// ----- Category Routes -----



// Create a new category (Protected, Admin only)
// POST    http://localhost:4000/v1/category
router.route("/")
.post(verifyToken, sanitizeInputs, checkAdmin, categoryController.createCategory)

 // Retrieve all categories (Public)
 // GET    http://localhost:4000/v1/category
.get(categoryController.getAllCategory);                                           


// Delete an existing category by ID (Protected, Admin only)
// DELETE    http://localhost:4000/v1/category/:id
router.route("/:id")
.delete(verifyToken, checkAdmin, categoryController.removeCategory)

// Update an existing category by ID (Protected, Admin only)
// PUT    http://localhost:4000/v1/category/:id
.put(verifyToken, checkAdmin, categoryController.updateCategory)    



module.exports = router;