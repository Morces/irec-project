require("dotenv").config;
const jwt = require("jsonwebtoken");

function generateAccessToken(user, exp = 12) {
  return jwt.sign(user, process.env.BEARER, { expiresIn: `${exp}hr` });
}

module.exports = generateAccessToken;
