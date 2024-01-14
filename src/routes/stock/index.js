const { createStock, allStock } = require("../../api/stock");

const router = require("express").Router();

router.get("/stock", allStock);
router.post("/stock", createStock);

module.exports = router;
