const router = require("express").Router();

const Transaction = require("../Controllers/Transactions/list");

router.get("/", Transaction);

module.exports = router;
