require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// Database
const database = require("./database");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");


// Initialization
const booky = express();


// Configuration
booky.use(express.json());
// Establish Database Connection
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
)
.then(() => console.log("connection established"));

/*>>>>>>>>>>>>>>>>>>>>>> GET <<<<<<<<<<<<<<<<<<<<*/
/* 
Route         /
Description   Get all books
Access        Public
Parameter     None
Methods       GET
*/
booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});
/*
Route         /is
Description   Get specific books based on ISBN
Access        Public
Parameter     isbn
Methods       GET
*/

booky.get("/is/:isbn", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    //const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if (!getSpecificBook) {
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

booky.get("/c/:category", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({category:req.params.category,});
    //const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));
    if (!getSpecificBook) {
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
booky.get("/authors", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors});
});

/*
Route         /author/id
Description   Get specific author {problem}
Access        Public
Parameter     id
Methods       GET
*/
booky.get("/authors/:id", (req, res) => {           //parseInt(req.params.authorId)
    //const getSpecificAuthor = database.author.filter((author) => author.id.includes(parseInt(req.params.id)));

    const getSpecificAuthor = database.authors.filter((author) => author.id.includes(parseInt(req.params.id)));

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the id of ${parseInt(req.params.id)}` });
    }
    return res.json({ author: getSpecificAuthor });
});

/*
Route         /author/name
Description   Get author by ame
Access        Public
Parameter     name
Methods       GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.authors.filter((author) => author.books.includes(req.params.isbn));
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the book of ${req.params.isbn}` });
    }
    return res.json({ author: getSpecificAuthor });
});


/*
Route         /author/book/isbn
Description   Get all author based on books
Access        Public
Parameter     isbn
Methods       GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.authors.filter((author) => author.books.includes(req.params.isbn));
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the book of ${req.params.isbn}` });
    }
    return res.json({ author: getSpecificAuthor });
});

/*
Route         /publications
Description   Get all publications
Access        Public
Parameter     none
Methods       GET
*/
booky.get("/publication", (req, res) => {
    return res.json({ publications: database.publications });
});


/*
Route         /publication/book
Description   Get all publications based on books
Access        Public
Parameter     isbn
Methods       GET
*/
booky.get("/publication/book/:isbn", (req, res) => {
    const getSpecificPublications = database.publications.filter((publication) => publication.books.includes(req.params.isbn));
    if (getSpecificPublications.length === 0) {
        return res.json({ error: `No Publications found for the book of ${req.params.isbn}` });
    }
    return res.json({ publication: getSpecificPublications });
});

/*>>>>>>>>>>>>>>>>>>>>>> POST <<<<<<<<<<<<<<<<<<<<*/
/*
Route         /book/add
Description   Add new book
Access        Public
Parameter     none
Methods       POST
*/
booky.post("/book/add", async(req, res) => {
    const { newBook } = req.body;

    const addNewBook = BookModel.create(newBook);
    //database.books.push(newBook);
    return res.json({ books: addNewBook});
});


/*
Route         /author/add
Description   Add new author
Access        Public
Parameter     none
Methods       POST
*/
booky.post("/author/add", async(req, res) => {
    const { newAuthor } = req.body;
    
    //database.authors.push(newAuthor);
    return res.json({ /*authors: database.authors */ message: "author was added"});
});

/*
Route         /publication/add
Description   Add new publication
Access        Public
Parameter     none
Methods       POST
*/
booky.post("/Publication/add", async(req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    //database.publications.push(newPublication);
    return res.json({message:"publication was added"});
});

/*>>>>>>>>>>>>>>>>>>>>>> PUT <<<<<<<<<<<<<<<<<<<<*/

/*
Route         /book/update/title
Description   update book title based on ISBN
Access        Public
Parameter     none
Methods       PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });

    return res.json({ books: database.books });
});

/*
Route         /book/update/update/author
Description   update/add author for a book
Access        Public
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/author/:isbn/:authorID", (req, res) => {

    // update book datebase
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.author.push(parseInt(req.params.authorID));
        }
    });

    // update the author database
    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId))
            return author.books.push(req.params.isbn);
    });
    return res.json({ books: database.books, author: database.author });
});

/*
Route         /publication/update/book
Description   update/add book to a publicaton
Access        Public
Parameter     isbn
Methods       PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
    // Update the publication data base
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId) {
           return publication.books.push(req.params.isbn);
        }
    });
    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({
        books: database.books, 
        publications: database.publications, 
        //message: "successfully updated publication",
    });
});

/*>>>>>>>>>>>>>>>>>>>>>> DELETE <<<<<<<<<<<<<<<<<<<<*/

/*
Route         /book/delete
Description   delete a book
Access        Public
Parameter     isbn
Methods       DELETE
*/

booky.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter((book) => book.ISBN != req.params.isbn);
    database.books = updatedBookDatabase;
    return res.json({ books: database.books});
});

/*
Route         /book/delete/author
Description   delete a author from a book
Access        Public
Parameter     isbn, author id
Methods       DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {

    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter((author) => author != parseInt(req.params.authorId));
            book.authors = newAuthorList;
            return;
        }
    });
    //update the author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn
            );
            author.books = newBooksList;
            return;
        }
    });
    return res.json({books: database.books, author: database.authors, message: "author was deleted",});
});

/*
Route         /publication/delete/book
Description   delete a book from publication
Access        Public
Parameter     isbn, publication id
Methods       DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {

    // update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            const newBookList = publication.books.filter((book) => book != req.params.isbn
            );

            publication.books = newBookList;
            return;
        }
    });
    // update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = 0;
            return;
        }
    });
    return res.json({books: database.books, publications: database.publications});
});

booky.listen(3000, () => console.log("Hey server is running !"));
