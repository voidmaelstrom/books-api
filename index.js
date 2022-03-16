// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
// Apply cors to all routes prior
app.options('*', cors())
app.get('/', (req, res) => {
  res.send('Welcome to the Books API!')
})

// BOOKS
const booksController = require('./controllers/books_controller.js')
app.use('/books', booksController)

// LISTEN
app.listen(PORT, () => {
  console.log('CORS-enabled web server listening. Greetings! From port: ', PORT);
})