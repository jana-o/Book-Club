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

router.get("/books", (req, res, next) => {
  res.render("books");
});

router.get("/books", (req, res, next) => {
  bookApi
    .get(`/volumes?q=${req.query.q}`)
    .then(response => {
      res.render("books", {
        books: response.data.items
      });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
});

router.get("/save-book/:id", (req, res, next) => {
  let bookId = req.params.id;
  let userId = req.user._id;

  User.findById(userId)
    .then(user => {
      user.books.push(bookId);
      user.save().then(updatedUser => {
        //console.log("Book added to User.books -->", updatedUser);
        res.render("mylibrary", { user });
      });
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
