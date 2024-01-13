const { createStock } = require("../../api/stock");

const router = require("express").Router();

// router.get("/product", allProduct);
router.post("/stock", createStock);

module.exports = router;
