require("dotenv").config();

const mongoose = require("mongoose");
const Club = require("../models/Club");
const Book = require("../models/Book");

const dbName = "project-2---book-club";
mongoose.connect(process.env.MONGODB_URI);

Club.collection.drop();
Book.collection.drop();

const clubs = [
  {
    clubname: `Entrepreneur Reading Circle`,
    genre: `Business`,
    users: [],
    books: [],
    icon: `images/books.png`
  },
  {
    clubname: `Self-Improvement Club`,
    genre: `Self-Improvement`,
    users: [],
    books: [],
    icon: `images/books2.png`
  },
  {
    clubname: `Popular Economics`,
    genre: `Economics`,
    users: [],
    books: [],
    icon: `images/books2.png`
  },
  {
    clubname: `High Fantasy Fan Club`,
    genre: `Fantasy`,
    users: [],
    books: [],
    icon: `images/books2.png`
  }
];

const books = [
  {
    googleId: 1,
    title: `Harry 1`,
    author: `J. K. Rowling`,
    clubs: [],
    icon: `images/books.png`
  },
  {
    googleId: 2,
    title: `Harry 2`,
    author: `J. K. Rowling`,
    clubs: [],
    icon: `images/books.png`
  },
  {
    googleId: 3,
    title: `Harry 3`,
    author: `J. K. Rowling`,
    clubs: [],
    icon: `images/books.png`
  }
];

Club.create(clubs, err => {
  if (err) {
    throw err;
  } else {
    clubs.forEach(club => {
      console.log(club);
    });
  }
});

Book.create(books, err => {
  if (err) {
    throw err;
  } else {
    books.forEach(book => {
      console.log(book);
    });
  }
});

setTimeout(function() {
  mongoose.connection.close();
}, 3000);
