/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";


// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const verifyToken = require('./../../middlewares/tokenVerify_middleware');
const checkAdmin = require('./../../middlewares/checkAdmin_middleware');

const menuController = require("./../../controllers/v1/menu_controller.js");

// ----- Routes -----

// Create a menu
router.route("/")
.post(verifyToken, checkAdmin, menuController.createMenu)
.get(verifyToken, checkAdmin, menuController.getAllMenus);


// Get single menu
router.route("/:menuId").get(verifyToken, checkAdmin, menuController.getSingleMenu);


module.exports = router;