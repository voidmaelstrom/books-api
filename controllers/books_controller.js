const express = require('express')
const books = express.Router()
const db = require('../models')
const Book = require('../models/books')

books.get('/seed', (req, res) => {
  Book.insertMany([
    {
      "id": 1,
      "title": "1984",
      "description": "A startling and haunting novel, 1984 creates an imaginary world that is completely convincing from start to finish.",
      "year": 1949,
      "quantity": "10",
      "imageURL": "../assets/1984.jpg"
    },
    {
      "id": 2,
      "title": "Ender's Game",
      "description": "The survival of humanity depends on a military genius who can defeat the aliens. But who?",
      "year": 1985,
      "quantity": "15",
      "imageURL": "../assets/endersgame.jpg"
    },
    {
      "id": 3,
      "title": "Hitchhiker's Guide to the Galaxy",
      "description": "It’s an ordinary Thursday morning for Arthur Dent . . . until his house gets demolished. The Earth follows shortly after to make way for a new hyperspace express route, and Arthur’s best friend has just announced that he’s an alien.",
      "year": 1979,
      "quantity": "25",
      "imageURL": "../assets/hitchhikersguidetothegalaxy.jpg"
    },
    {
      "id": 4,
      "title": "Neuromancer",
      "description": "Before the Internet was commonplace, William Gibson showed us the Matrix—a world within the world, the representation of every byte of data in cyberspace.",
      "year": 1962,
      "quantity": "20",
      "imageURL": "../assets/neuromancer.jpg"
    }
  ])
  .then(createdBooks => {
    res.json({
      message: "Successfully seeded books!"
    })
  })
})

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