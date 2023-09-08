const mongoose = require('mongoose');

// Sub-schema for managing content items
const contentItemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    url: String,
    description: String,
});


const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    items: [contentItemSchema], // Array of content items
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
