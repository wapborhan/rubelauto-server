const { createProduct, allProduct } = require("../controllers/product");

const router = require("express").Router();

router.get("/", allProduct).post("/", createProduct);

module.exports = router;
