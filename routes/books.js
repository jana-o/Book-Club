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
  bookApi
    .get(`/volumes?q=${req.query.q}`)
    .then(response => {
      // console.log(response.data.items.authors)
      res.render("books", {
        books: response.data.items, req
      });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
});

// router.get("/search", (req, res, next) => {
//   bookApi
//     .get(`/volumes?q=${req.query.q}`)
//     .then(response => {
//       res.render("search", {
//         books: response.data.items
//       });
//     })
//     .catch(err => {
//       console.log("Something went wrong!", err);
//     });
// });

router.get("/:googleId/new-favorite", (req, res, next) => {
  let bookId = req.params.id;
router.get("/:metadata/new-favorite", ensureAuthenticated, (req, res, next) => {
  let m = req.params.metadata
  let bookId = m.substring(0, m.indexOf("+",0));
  let author = m.substring(m.indexOf("+",0) + 1, m.indexOf("+",m.indexOf("+",0) + 1))
  let rev = m.split("").reverse().join("")
  let title = rev.substring(0, rev.indexOf("+")).split("").reverse().join("")
  let userId = req.user._id;

  User.findById(userId)
    .then(user => {
      // console.log(user.username)
      // console.log("is favouriting: ", bookId)
      Book.create({googleId: bookId,
      author,
      title})
      .then ((bookObj) => {
        user.favoriteBooks.push(bookObj);
        user.save().then(updatedUser => {
        //console.log("Book added to User.books -->", updatedUser);
        res.render("mylibrary", { user, req });
      });
      })

      
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
