// var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// const User = require("../models/User");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function(err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );
