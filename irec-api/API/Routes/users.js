const router = require("express").Router();

const { AddUser, Login } = require("../Controllers/Users");

router.post("/add", AddUser);
router.post("/login", Login);

module.exports = router;
