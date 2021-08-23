const mongoose = require("mongoose");

// Publication Schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

const PublicationModal = mongoose.model(PublicationSchema);

module.exports = PublicationModel;