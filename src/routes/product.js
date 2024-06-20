const { createProduct, allProduct } = require("../controllers/product");

const router = require("express").Router();

router.route("/product").get(allProduct).post(createProduct);

module.exports = router;
