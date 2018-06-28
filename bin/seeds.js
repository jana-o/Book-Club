require("dotenv").config();

const mongoose = require("mongoose");
const Club = require("../models/Club");
const Book = require("../models/Book");

const dbName = "project-2---book-club";
mongoose.connect(process.env.MONGODB_URI);

Club.collection.drop();
Book.collection.drop();

setTimeout(function() {
  const clubs = [
    new Club({
      clubname: `Entrepreneur Reading Circle`,
      genre: `Business`,
      users: [],
      books: [],
      icon: `images/books.png`
    }),
    new Club({
      clubname: `Self-Improvement Club`,
      genre: `Self-Improvement`,
      users: [],
      books: [],
      icon: `images/books2.png`
    }),
    new Club({
      clubname: `Popular Economics`,
      genre: `Economics`,
      users: [],
      books: [],
      icon: `images/books2.png`
    }),
    new Club({
      clubname: `High Fantasy Fan Club`,
      genre: `Fantasy`,
      users: [],
      books: [],
      icon: `images/books2.png`
    })
  ];

  let books = [
    new Book({
      googleId: "2dQuDwAAQBAJ",
      title: `Harry 1`,
      author: `J. K. Rowling`,
      clubs: [clubs[3]._id],
      icon: `images/books.png`
    }),
    new Book({
      googleId: "1o7D0m_osFEC",
      title: `Harry 2`,
      author: `J. K. Rowling`,
      clubs: [clubs[3]._id],
      icon: `images/books.png`
    }),
    new Book({
      googleId: "wHlDzHnt6x0C",
      title: `Harry 3`,
      author: `J. K. Rowling`,
      clubs: [clubs[3]._id],
      icon: `images/books.png`
    })
  ];

  for (let i = 0; i < books.length; i++) {
    clubs[3].books.push(books[i]._id);
    books[i].save();
  }

  for (let i = 0; i < clubs.length; i++) {
    clubs[i].save();
  }
}, 1000);

setTimeout(function() {
  mongoose.connection.close();
}, 3000);
