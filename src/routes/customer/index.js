const { createCustomer } = require("../../api/customer");

const router = require("express").Router();

// router.get("/customer", allCustomer);
router.post("/customer", createCustomer);

module.exports = router;
