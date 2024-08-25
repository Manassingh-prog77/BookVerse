const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: String,
    age: Number,
    authorId: String,
})

module.exports = mongoose.model('Author',AuthorSchema);