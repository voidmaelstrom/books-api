# Books API

An API for Books

## Routes for Books
| Method |           Path           |                      Purpose                     |
|:------:|:------------------------:|:------------------------------------------------:|
|   GET  |             /            |                    Home Page                     |
|   GET  |          /books          |                 Return all books                 |
|  POST  |          /books          |                 Create new book                  |
|   GET  |       /books/random      |                Return random book                |
|   GET  |        /books/:id        |           Return a specific book by id           |
|   PUT  |        /books/:id        |             Update a specific book               |
|   GET  |    /books/title/:title   |          Return a specific book by title         |
| DELETE |        /books/:id        |             Delete a specific book               |