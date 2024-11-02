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

const menuController = require("./../../controllers/v1/menu_controller");



// ----- Menu Routes -----


// Create a new menu item (Protected, Admin only)
// POST    http://localhost:4000/v1/menus
router.route("/")
.post(verifyToken, checkAdmin, menuController.createMenu)

// Retrieve all menus with submenus (Protected, Admin only)
// GET    http://localhost:4000/v1/menus
.get(verifyToken, checkAdmin, menuController.getAllMenus);


// Retrieve a single menu by ID, including its submenus if available (Protected, Admin only)
// GET    http://localhost:4000/v1/menus/:menuId
router.route("/:menuId").get(verifyToken, checkAdmin, menuController.getSingleMenu);


module.exports = router;