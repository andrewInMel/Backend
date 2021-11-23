const fs = require("fs");
const path = require("path");
const User = require("../api_routes/userRoutes");

const pathToKey = path.join(__dirname, "/../", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

/* config options */

const tokenOption = {};
