
const passport = require('passport');
FbStrategy = require('passport-facebook').Strategy;
const User          = require('../models/User');


passport.use(new FbStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://readerly-project.herokuapp.com/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    console.log(profile)
    const newUser = new User({
      facebookID: profile.id,
      username: `${profile.name.givenName} ${profile.name.familyName}` ,
      email: profile.emails[0].value,
      confirmationStatus: 'confirmed'
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));