/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadCover, uploadVideo } = require("./../../utils/multerUploader_util");
// const multerStorage = require("./../../utils/multerUploader_util");

// ----- Custom modules -----
const tutorialController = require('../../controllers/v1/tutorial_controller');
const verifyToken = require('../../middlewares/tokenVerify_middleware');
const checkAdmin = require('../../middlewares/checkAdmin_middleware');
const sanitizeInputs = require('../../middlewares/sanitize_middleware');
const checkRoles = require('../../middlewares/checkRole_middleware');



// ----- Routes -----

router.route("/create")
    .post(
        uploadCover.single("cover"), 
        verifyToken,
        checkRoles("ADMIN", "INSTRUCTOR"),
        tutorialController.createTutorial
    );

router.route("/")
.get(verifyToken, checkAdmin, tutorialController.getAllTutorials);


router.route("/sections")
.get(verifyToken, checkAdmin, tutorialController.getAllSections);

router.route("/:tutorialId/sections")
.post(
    uploadVideo.single("video"), 
    verifyToken,
    checkRoles("ADMIN", "INSTRUCTOR"),
    tutorialController.addSectionToTutorial
);


router.route("/:href/sections/:sectionId").get(tutorialController.getTutorialSectionInfo);


router.route("/sections/:sectionId")
.delete(verifyToken, checkAdmin, tutorialController.removeOneSection);


router.route("/:tutorialId/enroll").post(verifyToken, tutorialController.enrollInTutorial);


router.route("/category/:categoryHref").get(tutorialController.getTutorialByCategory)


router.route("/details/:tutorialHref").get(verifyToken, tutorialController.getOneTutorialDetails);


router.route("/:tutorialId").delete(verifyToken, checkAdmin, tutorialController.deleteTutorialById);

module.exports = router;
