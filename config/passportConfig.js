const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
/* read public key */
const pathToKey = path.join(__dirname, "/../", "id_rsa_pub.pem");
const pubKey = fs.readFileSync(pathToKey, "utf-8");

/* config options */
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: pubKey,
  algorithms: ["RS256"],
};

module.exports = (passport) =>
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
