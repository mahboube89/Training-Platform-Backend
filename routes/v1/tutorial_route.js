/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();
const multer = require('multer');
// const upload = require("./../../utils/multerUploader_util");
const multerStorage = require("./../../utils/multerUploader_util");

// ----- Custom modules -----
const tutorialController = require('../../controllers/v1/tutorial_controller');
const verifyToken = require('../../middlewares/tokenVerify_middleware');
const checkAdmin = require('../../middlewares/checkAdmin_middleware');
const sanitizeInputs = require('../../middlewares/sanitize_middleware');
const checkRoles = require('../../middlewares/checkRole_middleware');



// ----- Routes -----

router.route("/create")
    .post(
        multer({storage: multerStorage, limits: {fileSize: 2 * 1024 * 1024}}).single("cover"), 
        verifyToken,
        checkRoles("ADMIN", "INSTRUCTOR"),
        tutorialController.createTutorial
    );

router.route("/")
.get(verifyToken, checkAdmin, tutorialController.getAllTutorials);


module.exports = router;
