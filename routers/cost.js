const { createCost, allCost } = require("../controllers/cost");

const router = require("express").Router();

router.post("/", createCost).get("/", allCost);

module.exports = router;
