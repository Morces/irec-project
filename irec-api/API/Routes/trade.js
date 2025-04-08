const router = require("express").Router();

const Buy = require("../Controllers/Trade/Buy");
const Sell = require("../Controllers/Trade/Sell");
const GetBalance = require("../Controllers/Trade/GetBalance");
const GetPrice = require("../Controllers/Trade/GetPrice");
const GetSourceBalance = require("../Controllers/Trade/GetSourceBalance");
const Burn = require("../Controllers/Trade/Burn");
const Transfer = require("../Controllers/Trade/Transfer");
const Mint = require("../Controllers/Trade/Mint");
const GetMarketplaceItems = require("../Controllers/Trade/GetMarketPlaceItems");

router.post("/buy", Buy);
router.post("/sell", Sell);
router.post("/transfer", Transfer);
router.post("/burn", Burn);
router.get("/balance", GetBalance);
router.get("/source-balance", GetSourceBalance);
router.get("/price", GetPrice);
router.get("/marketplace", GetMarketplaceItems);

module.exports = router;
