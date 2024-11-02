/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const express = require('express');
const router = express.Router();
const { uploadCover, uploadVideo } = require("./../../utils/multerUploader_util");


// ----- Custom modules -----
const tutorialController = require('../../controllers/v1/tutorial_controller');
const verifyToken = require('../../middlewares/tokenVerify_middleware');
const checkAdmin = require('../../middlewares/checkAdmin_middleware');
const checkRoles = require('../../middlewares/checkRole_middleware');



// ----- Tutorial Routes -----


// Create a new tutorial with cover upload (Restricted to ADMIN and INSTRUCTOR)
// POST http://localhost:4000/v1/tutorial/create
router.route("/create").post( uploadCover.single("cover"), verifyToken, checkRoles("ADMIN", "INSTRUCTOR"), tutorialController.createTutorial);


// Retrieve all tutorials (Restricted to ADMIN)
// GET http://localhost:4000/v1/tutorial
router.route("/").get(verifyToken, checkAdmin, tutorialController.getAllTutorials);


// Retrieve all tutorial sections (Restricted to ADMIN)
// GET http://localhost:4000/v1/tutorial/sections
router.route("/sections").get(verifyToken, checkAdmin, tutorialController.getAllSections);


// Add a new section to a specific tutorial (Restricted to ADMIN and INSTRUCTOR)
// POST http://localhost:4000/v1/tutorial/:tutorialId/sections
router.route("/:tutorialId/sections").post( uploadVideo.single("video"), verifyToken,checkRoles("ADMIN", "INSTRUCTOR"),tutorialController.addSectionToTutorial);


// Get details of a specific tutorial section (Public)
// GET http://localhost:4000/v1/tutorial/:tutorialSlug/sections/:sectionId
router.route("/:tutorialSlug/sections/:sectionId").get(tutorialController.getTutorialSectionInfo);


// Delete a specific section (Restricted to ADMIN)
// DELETE http://localhost:4000/v1/tutorial/sections/:sectionId
router.route("/sections/:sectionId").delete(verifyToken, checkAdmin, tutorialController.removeOneSection);


// Enroll in a tutorial (Authenticated users only)
// POST http://localhost:4000/v1/tutorial/:tutorialId/enroll
router.route("/:tutorialId/enroll").post(verifyToken, tutorialController.enrollInTutorial);


// Get tutorials by category (Public)
// GET http://localhost:4000/v1/tutorial/category/:categorySlug
router.route("/category/:categorySlug").get(tutorialController.getTutorialByCategory)


// Get detailed information for a specific tutorial (Authenticated users only)
// GET http://localhost:4000/v1/tutorial/details/:tutorialSlug
router.route("/details/:tutorialSlug").get(verifyToken, tutorialController.getOneTutorialDetails);


// Delete a tutorial (Restricted to ADMIN)
// DELETE http://localhost:4000/v1/tutorial/:tutorialId
router.route("/:tutorialId").delete(verifyToken, checkAdmin, tutorialController.deleteTutorialById)


// get related tutorials (Public)
// GET http://localhost:4000/v1/tutorial/:tutorialId
.get(tutorialController.getRelatedTutorials);




module.exports = router;
