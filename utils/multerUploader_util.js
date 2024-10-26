/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const path = require('path');
const multer = require('multer');

// Define the storage configuration
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..", "public", "tutorials", "covers"));
    },
    filename: (req, file, callback) => {
        const fileName = Date.now() + String(Math.round(Math.random() * 999));
        const ext = path.extname(file.originalname);
        callback(null, fileName + ext)
    }
});

// File filter function for image validation
const fileFilter = (req, file, callback) => {
    const allowMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowMimeTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Unsupported file type. Please upload an image."), false)
    }
};


// Define the multer upload instance
const upload = multer({
    storage: storage,
    limits: {fileSize: 2 * 1024 * 1024}, // Limit file size to 2MB
    fileFilter: fileFilter
});

module.exports = upload;