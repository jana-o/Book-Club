const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Club = require("../models/Club");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET home page */
router.get("/home", (req, res, next) => {
  res.render("home");
});

/* GET Profile*/
router.get("/user/:id", (req, res, next) => {
  let userId = req.params.id;
  console.log(userId);
  User.findOne({ _id: userId })
    .then(user => {
      res.render("profile", { user });
    })
    .catch(error => {
      console.log(error);
    });
});

/* GET */
router.get("/browse", (req, res, next) => {
  Club.find()
    .then(club => {
      res.render("club/browse", { club });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
