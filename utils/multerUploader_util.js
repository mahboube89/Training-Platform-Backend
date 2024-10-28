/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const path = require('path');
const multer = require('multer');


// Define the storage configuration with dynamic destination based on field name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'cover' 
            ? path.join(__dirname, "..", "public", "tutorials", "covers") 
            : path.join(__dirname, "..", "public", "tutorials", "videos");
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + String(Math.round(Math.random() * 999));
        const ext = path.extname(file.originalname);
        cb(null, fileName + ext);
    }
});

// Define separate multer instances for cover and video with different file size limits
const uploadCover = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit for cover images
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed for cover."), false);
        }
    }
});

const uploadVideo = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit for video files
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['video/mp4', 'video/mpeg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only video files are allowed for sections."), false);
        }
    }
});

// module.exports = upload;
module.exports = { uploadCover, uploadVideo };