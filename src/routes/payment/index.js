const { createPayment } = require("../../api/payment");

const router = require("express").Router();

// router.get("/product", allProduct);
router.put("/payment/:cardNo", createPayment);

module.exports = router;
