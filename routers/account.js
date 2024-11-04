const { allAccounts, transferAmount } = require("../controllers/accounts");

const router = require("express").Router();

router.get("/all", allAccounts).post("/transfer", transferAmount);

module.exports = router;
