const books = [
    {
        ISBN: "12345Book",
        title: "Getting Started With MERN",
        pubDate: "2021-07-07",
        language: "en",
        numPage: 250,
        author: [1, 2],
        publications: [1],
        category: ["tech", "programming", "thriller"]
    },
];

const author = [
    {
        id: 1,
        name: "pavan",
        books: ["12345Book", "secret"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"],
    },
];

const publication = [
    {
        id: 1,
        name: "Writex",
        books: ["12345Book"],
    },
];



module.exports = {books, author, publication};