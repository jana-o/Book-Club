/// auth routes
// requirements
const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

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
        message: "The email is already in use, please login via the link below."
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
      res.redirect("/home");
    }
  });

  // sending user a confirmation link to activate their account - this might have to be in a .then
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PW
    }
  });
  transporter
    .sendMail({
      from: '"Readerly" <nahom.delfino@gmail.com>',
      to: email,
      subject: "Welcome to Readerly! Account Confirmation Link",
      text: `Welcome to Readerly, the newest micro book-club platform! Please follow this link to confirm your registration and start using the platform: http://localhost:3000/auth/confirm/${hashPass}. We look forward to seeing you soon!`,
      html: `<b>Welcome to Readerly, the newest micro book-club platform! Please follow this link to confirm your registration and start using the platform: <a href="http://localhost:3000/auth/confirm/${hashPass}">Account Confirmation Link</a>. We look forward to seeing you soon!</b>`
    })
    .catch(error => console.log(error));
});

authRoutes.get("/confirm/:hashpass", (req, res, next) => {
  let hashpass = req.params.hashpass.replace(/\//g, "");
  let query = { password: hashpass };

  User.findOneAndUpdate(query, { confirmationStatus: "confirmed" })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      throw err;
    });
});

/// facebook login routes
authRoutes.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
authRoutes.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/login"
  })
);

/// login routes
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: `/home`,
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

/// logout route
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
