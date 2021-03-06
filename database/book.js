const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    authors: [Number],
    publication: Number,
    category: [String],
});

// Create Book model

const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;