const { createProduct } = require("../../api/product");

const router = require("express").Router();

// router.get("/customer", allLead);
router.post("/product", createProduct);

module.exports = router;
