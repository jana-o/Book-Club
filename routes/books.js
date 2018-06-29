const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

const User = require("../models/User");
const Club = require("../models/Club");
const Book = require("../models/Book");

const bookApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/"
});
//https://www.googleapis.com/books/v1/volumes?q=harry+potter
//let title = response.data.volumes.items[0].volumeInfo.title;

//ensureAuthenticated, !!!!

// router.get("/books", (req, res, next) => {
//   res.render("books");
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.confirmationStatus === "confirmed") {
    return next();
  } else {
    res.redirect("auth/login");
  }
}

router.get("/", ensureAuthenticated, (req, res, next) => {
  if (!req.query.q) {
    res.render("books", { req });
  } else if (req.query.q) {
    bookApi
      .get(`/volumes?q=${req.query.q}`)
      .then(response => {
        response.data.items.map(elem => {
          if (elem.volumeInfo.imageLinks) {
            let url = elem.volumeInfo.imageLinks.smallThumbnail;
            console.log(url);
            elem.volumeInfo.imgUrl = url.substring(url.indexOf("=", 0) + 1);
          }
        });
        res.render("books", {
          books: response.data.items,
          req
        });
      })
      .catch(err => {
        console.log("Something went wrong!", err);
      });
  }
});

router.get("/:metadata/new-favorite", ensureAuthenticated, (req, res, next) => {
  let m = req.params.metadata;
  let bookId = m.substring(m.indexOf("id=-os") + 6, m.indexOf("author"));
  let author = m.substring(m.indexOf("author=") + 7, m.indexOf("title"));
  let title = m.substring(m.indexOf("title=") + 6, m.indexOf("img"));
  let imgUrl = m.substring(m.indexOf("img=") + 4);
  let userId = req.user._id;

  User.findById(userId).then(user => {
    Book.findOne({ googleId: bookId })
      .then(book => {
        // if book isn't in database, create it and push on their collection
        if (!book) {
          Book.create({
            googleId: bookId,
            author,
            title,
            icon: `http://books.google.com/books/content?id=${imgUrl}`
          }).then(bookObj => {
            user.favoriteBooks.push(bookObj);
            user.save().then(updatedUser => {
              //console.log("Book added to User.books -->", updatedUser);
              res.redirect("/mylibrary");
              
            });
          });
          // if it is in the database, push it on their collection
        } else {
          // if they don't already have it in their favourites that is
          if (!user.favoriteBooks.map(id => id.toString()).includes(book._id.toString())) {
            console.log("IF!")
            user.favoriteBooks.push(book);
            user.save().then(updatedUser => {
              res.redirect("/mylibrary");
              
            });
          }
          // else placebo
          else {
            console.log("ELSE!")
            res.redirect("/mylibrary");
              
          }
        }
      })
      .catch(err => {
        throw err;
      });
  });
});

module.exports = router;
