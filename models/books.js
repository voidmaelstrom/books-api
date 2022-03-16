// require mongoose 
const mongoose = require('mongoose')

// schema
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    year: Number,
    quantity: Number,
    imageURL: String
})

// model and export 
module.exports = mongoose.model('Book', bookSchema)