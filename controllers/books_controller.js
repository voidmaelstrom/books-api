const express = require('express')
const books = express.Router()
const db = require('../models')
const Book = require('../models/books')

// Index:
books.get('/', (req, res) => {
  Book.find()
    .then(foundBooks => {
      res.json(foundBooks)
    })
})

// Random Book:
books.get('/random', async (req, res) => {
  let count = await Book.countDocuments()
  let random = Math.floor(Math.random() * count)
  Book.findOne().skip(random)
    .then(foundBook => {
      res.json(foundBook)
    })
})

// GET by id:
books.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(foundBook => {
      res.json(foundBook)
    })
    .catch(() => {
      res.status(404).json(`{ error: "${res.statusCode} Book id not found" }`)
    })
})

// GET by title:
books.get('/title/:title', (req, res) => {
  Book.findOne({ title: req.params.title })
    .then(foundBook => {
      foundBook? res.json(foundBook):
      res.status(404).json(`{ error: "${res.statusCode} Book title not found" }`)
    })
})

// POST
books.post('/', (req, res) => {
  Book.create(req.body)
    .then(createdBook => {
      res.json(createdBook)
    })
    .catch(() => {
      res.status(400).json(`{ error: "${res.statusCode} Bad request. Book not created." }`)
    })
})

// PUT
books.put('/:id', (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  db.Book.findByIdAndUpdate(req.params.id, req.body)
    .then(()=> {
      res.json(`Book ${req.params.id} successfully updated`)
    })
    .catch(() => {
      res.status(400).json(`{ error: "${res.statusCode} Bad request. Book not updated." }`)
    })
})

// DELETE
books.delete('/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json(`${req.params.id} successfully deleted`)
    })
    .catch(err => {
      res.status(404).json(`{ error: "${res.statusCode} Not found. Book not deleted." }`)
    })
})

module.exports = books