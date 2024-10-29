/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();


// ----- Custom modules -----
const verifyToken = require('../../middlewares/tokenVerify_middleware');
const commentController = require('../../controllers/v1/comment_controller');



// ----- Routes -----

router.route("/").post(verifyToken, commentController.addComment);

module.exports = router;