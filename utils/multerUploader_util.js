/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const path = require('path');
const multer = require('multer');


module.exports = multer.diskStorage({

    destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "tutorials", "covers"));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + String(Math.round(Math.random() * 999));
        const ext = path.extname(file.originalname);
        cb(null, fileName + ext)
    }

});