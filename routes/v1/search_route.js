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

// ----- Routes -----
router.route("/:keyword").get(searchController.findKeywordGlobal);





module.exports = router;