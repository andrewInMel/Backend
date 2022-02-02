const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
/* read public key */
const pathToKey = path.join(__dirname, "/../", "id_rsa_pub.pem");
const pubKey = fs.readFileSync(pathToKey, "utf-8");

const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token.slice(7);
};

/* config options */
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: pubKey,
  algorithms: ["RS256"],
};

module.exports.jwtConfig = (passport) =>
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload.sub })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );

module.exports.googleConfig = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "https://example.com:5000/auth/google/callback",
    },
    /* called when successfully anthorized by google */
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id })
        .then((oneUser) => {
          if (!oneUser) {
            const newUser = new User({
              googleId: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
            });
            newUser.save().then((user) => {
              cb(null, user);
            });
          } else {
            cb(null, oneUser);
          }
        })
        .catch((e) => console.log(e));
    }
  )
);
