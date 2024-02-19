const { createPayment, showPayment } = require("../../api/payment");

const router = require("express").Router();

// router.post("/payment/:cardNo", createPayment);
router.get("/installment/:id", showPayment);
router.post("/installment/", createPayment);

module.exports = router;
