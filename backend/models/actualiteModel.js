// models/actualite.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actualiteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    file: {
        data: Buffer,           // Store binary data of the file
        contentType: String,    // Store MIME type of the file
        filename: String        // Store original filename
    },
    createdAt: { type: Date, default: Date.now }
});

const Actualite = mongoose.model('Actualite', actualiteSchema);

module.exports = Actualite;
