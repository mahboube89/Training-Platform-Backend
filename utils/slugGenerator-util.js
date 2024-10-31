/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const slugify = require('slugify');

function generateSlug(text) {
    // Limit the title to the first 5 words (or another limit you prefer)
    const limitedText = text.split(" ").slice(0, 5).join(" ");
    return slugify(limitedText, {
        lower: true,     // Transform to lowercase
        strict: true     // Remove special characters
    });
}

module.exports = { generateSlug };
