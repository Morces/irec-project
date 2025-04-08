require("dotenv").config;

const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  let url = req.originalUrl;

  if (url.includes("users/login")) {
    next();
    return;
  }

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.BEARER);

      req.user = decoded;
      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).json({
        custom: true,
        message: "Not authorized, invalid token",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      custom: true,
      message: "Not authorized, no token",
    });
  }
};

module.exports = Auth;
