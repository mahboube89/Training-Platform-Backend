/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const searchController = require("./../../controllers/v1/search_controller");



// ----- Search Routes -----


// Global search for a keyword across tutorials(Public)
// GET    http://localhost:4000/v1/search/:keyword
router.route("/:keyword").get(searchController.findKeywordGlobal);



module.exports = router;