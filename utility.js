const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
/* retrive private key */
const keyPath = path.join(__dirname, "./encryption/id_rsa_priv.pem");
const privateKey = fs.readFileSync(keyPath, "utf8");

function issueJWT(userId) {
  const id = userId;
  const expires = "30min";

  const playlod = {
    sub: id,
    iat: Date.now(),
  };

  /* signed token */
  const jwt = jsonwebtoken.sign(playlod, privateKey, {
    expiresIn: expires,
    algorithm: "RS256",
  });

  return {
    token: `Bearer ${jwt}`,
    expires: expires,
  };
}

module.exports = issueJWT;
