const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../models/User");
const Club = require("../models/Club");

//Middleware//

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("auth/login");
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET home page */
router.get("/home", ensureAuthenticated, (req, res, next) => {
  res.render("home", { layout: "layoutB.hbs" });
});

/* GET Profile*/
router.get("/user/:id", ensureAuthenticated, (req, res, next) => {
  let userId = req.params.id;
  console.log(userId);
  User.findOne({ _id: userId })
    .then(user => {
      res.render("profile", { user, layout: "layoutB.hbs" });
    })
    .catch(error => {
      console.log(error);
    });
});

/* GET Browse*/
router.get("/browse", ensureAuthenticated, (req, res, next) => {
  Club.find()
    .then(club => {
      res.render("club/browse", { club, layout: "layoutB.hbs" });
    })
    .catch(error => {
      console.log(error);
    });
});

/* GET Club*/
router.get("/club/:id", ensureAuthenticated, (req, res, next) => {
  let clubId = req.params.id;
  Club.findOne({ _id: clubId })
    .then(club => {
      console.log(club);
      res.render("club/clubProfile", { club, layout: "layoutB.hbs" });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
