const { createProduct, allProduct } = require("../../api/product");

const router = require("express").Router();

router.get("/product", allProduct);
router.post("/product", createProduct);

module.exports = router;
