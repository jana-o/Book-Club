const express = require("express");
const passport = require("passport");
const router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User");
const Club = require("../models/Club");
const Book = require("../models/Book");

//Middleware;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.confirmationStatus === "confirmed") {
    return next();
  } else {
    res.redirect("auth/login");
  }
}


/* GET INDEX page */
router.get("/", (req, res, next) => {
  res.render("index", {req});
});

/* GET home page */
router.get("/home", ensureAuthenticated, (req, res, next) => {
  User.findById(req.user._id)
  .populate("favoriteBooks")
  .populate("clubs")
  .then((user) =>{
    console.log(user)
    res.render("home", {req, user});
  })
});


/* GET Profile*/
router.get("/user/:id", ensureAuthenticated, (req, res, next) => {
  let userId = req.params.id;
  console.log(userId);
  User.findOne({ _id: userId })
    .then(user => {
      res.render("profile", { user, req });
    })
    .catch(error => {
      console.log(error);
    });
});

/* GET Browse*/
router.get("/browse", ensureAuthenticated, (req, res, next) => {
  Club.find()
    .populate("books")
    .then(club => {
      res.render("club/browse", { club, req });
    })
    .catch(error => {
      console.log(error);
    });
});

/* GET Club*/
router.get("/club/:id", ensureAuthenticated, (req, res, next) => {
  let clubId = req.params.id;

  Club.findOne({ _id: clubId })
    .populate("users")
    .then(club => {
      let memberStatus = false;
      // this checks whether the user is a member of the club, redirecting them to the logged in version if they are
      club.users.forEach(elem => {
        console.log(elem);
        if (elem.username === req.user.username) {
          console.log("user is a member of this club");
          memberStatus = true;
        }
      });
      res.render("club/clubProfile", { club, memberStatus, req });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/club/:id/join", ensureAuthenticated, (req, res, next) => {
  let clubId = req.params.id;
  let userId = req.user._id.toString();

  Club.findById(clubId)
    .then(club => {
      // if user is a member, redirect away from the join route to the default club page (prevents multiple registrations)
      if (club.users.map(id => id.toString()).includes(userId)) {
        res.redirect(`/club/${club._id}`);
      }
      // if not already a member, push the user id onto the club member array, pust the club id onto the user's membership array, redirect to default club page
      else {
        club.users.push(userId);
        club.save().then(() => {
          User.findByIdAndUpdate(userId, { $push: { clubs: clubId } }).then(
            () => {
              res.redirect(`/club/${club._id}`);
            }
          );
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
});
router.get("/club/:id/leave", ensureAuthenticated, (req, res, next) => {
  let clubId = req.params.id;
  let userId = req.user._id.toString();

  Club.findById(clubId)
    .then(club => {
      // if not a member of the club (don't know how you'd access this if you aren't a member, but just in case), this will redirect to default join club view
      if (!club.users.map(id => id.toString()).includes(userId)) {
        res.redirect(`/club/${club._id}`);
      }
      // else if you are a member (expected), find and remove from each of the club and user arrays + redirect
      else {
        club.users.splice(club.users.indexOf(userId), 1);
        club.save().then(() => {
          User.findById(userId)
            .then(user => {
              user.clubs.splice(user.clubs.indexOf(clubId), 1);
              user.save();
            })
            .then(() => {
              res.redirect(`/club/${club._id}`);
            });
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
