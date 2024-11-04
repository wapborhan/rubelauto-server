const { allAccounts } = require("../controllers/accounts");

const router = require("express").Router();

router.get("/all", allAccounts);

module.exports = router;
