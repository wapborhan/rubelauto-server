const { createStock, allStock } = require("../controllers/stock");

const router = require("express").Router();

router.get("/", allStock).post("/", createStock);

module.exports = router;
