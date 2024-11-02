/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Custom modules -----
const menuModel = require("./../models/menu_model");

const generateUniquePath = async (title) => {
    let basePath = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    let path = basePath;
    let suffix = 1;

    // Check if the generated path already exists, adding a suffix if necessary
    while (await menuModel.findOne({ path })) {
        path = `${basePath}-${suffix}`;
        suffix += 1;
    }

    return path;
};

module.exports = generateUniquePath;
