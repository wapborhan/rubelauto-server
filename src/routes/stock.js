const { createStock, allStock } = require("../controllers/stock");

const router = require("express").Router();

router.get("/stock", allStock).post(createStock);

module.exports = router;
