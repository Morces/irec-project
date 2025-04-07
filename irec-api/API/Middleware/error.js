require("dotenv").config();

function errorMiddleware(error, req, res, next) {
  console.log(error);
  console.log(error.message);

  if (error.custom) {
    return res.status(400).json(error);
  }

  if (error.message.includes("Unique constraint failed")) {
    if (error.meta) {
      return res.status(400).json({
        custom: true,
        message: `!! ${error.meta.target.join(", ")} .Should be unique`,
        meta: error.meta.target,
      });
    }
  }

  res.status(500).json({
    custom: false,
    message:
      process.env.NODE_ENV == "production" ? "Check form" : error.message,
  });
}

module.exports = errorMiddleware;
