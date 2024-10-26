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



router.route("/")
.post(verifyToken, sanitizeInputs, checkAdmin, categoryController.createCategory)
.get(categoryController.getAllCategory);


router.route("/:id")
.delete(verifyToken, checkAdmin, categoryController.removeCategory)
.put(verifyToken, checkAdmin, categoryController.updateCategory)

module.exports = router;