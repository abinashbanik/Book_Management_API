const express = require("express");

// Database
const database = require("./database");

// Initialization
const booky = express();

/* 
Route         /
Description   Get all books
Access        Public
Parameter     None
Methods       GET
*/
booky.get("/", (req, res) => {

    return res.json({ books: database.books });
});
/*
Route         /is
Description   Get specific books based on ISBN
Access        Public
Parameter     isbn
Methods       GET
*/

booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` });
    }
    return res.json({ book: getSpecificBook });
});

/*
Route         /c
Description   Get specific books based on Category
Access        Public
Parameter     Category
Methods       GET
*/

booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the category of ${req.params.category}` });
    }
    return res.json({ book: getSpecificBook });
});

/*
Route         /l
Description   Get specific books based on language
Access        Public
Parameter     Language
Methods       GET
*/

booky.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.language.includes(req.params.language));
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the language of ${req.params.language}` });
    }
    return res.json({ book: getSpecificBook });
});

/*
Route         /author
Description   Get all author
Access        Public
Parameter     None
Methods       GET
*/
booky.get("/author", (req, res) => {
    return res.json({authors: database.author});
});

/*
Route         /author/id
Description   Get specific author {problem}
Access        Public
Parameter     id
Methods       GET
*/
booky.get("/author/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.id.includes(req.params.id));
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the id of ${req.params.id}` });
    }
    return res.json({ authors: getSpecificAuthor });
});

/*
Route         /author/book
Description   Get all author based on books
Access        Public
Parameter     isbn
Methods       GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the book of ${req.params.isbn}` });
    }
    return res.json({ authors: getSpecificAuthor });
});

/*
Route         /publications
Description   Get all publications
Access        Public
Parameter     none
Methods       GET
*/
booky.get("/publication", (req, res) => {
    return res.json({publications: database.publication});
});
booky.listen(3000, () => console.log("Hey server is running !"));
