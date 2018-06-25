/// auth routes
// requirements
const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

///signup routes
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup", {
    errorMessage: "err"
  });
});

authRoutes.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;

  // empty validation
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Provide a username, password and email, or signup via Facebook."
    });
    return;
  }

  // unique username validation
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
  });

  // unique email validation
  User.findOne({ email }, "email", (err, email) => {
    if (email !== null) {
      res.render("auth/signup", {
        message: 'The email is already in use, please login via the link below.'
      });
      return;
    }
  });

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    password: hashPass,
    email
  });

  newUser.save(err => {
    if (err) {
      res.render("auth/signup", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
});

/// facebook login routes
authRoutes.get("/facebook", passport.authenticate("facebook", { scope: ['email'] }));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

/// login routes
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

/// logout route
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
