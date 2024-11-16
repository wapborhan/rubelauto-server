const { createIncome, allIncome } = require("../controllers/income");

const router = require("express").Router();

router.post("/", createIncome).get("/", allIncome);

module.exports = router;
