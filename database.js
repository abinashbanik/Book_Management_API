let books = [
    {
        ISBN: "12345Book",
        title: "Getting Started With MERN",
        pubDate: "2021-07-07",
        language: "en",
        numPage: 250,
        authors: [1, 2],
        publication: 1,
        category: ["tech", "programming", "thriller"],
    },
];

let authors = [
    {
        id: 1,
        name: "Abinash",
        books: ["12345Book", "secret"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"],
    },
];

let publications = [
    {
        id: 1,
        name: "Writex",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Writexxx",
        books: [],
    }
];



module.exports = {books, authors, publications};