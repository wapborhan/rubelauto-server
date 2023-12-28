const { createCustomer, allCustomer } = require("../../api/customer");

const router = require("express").Router();

router.get("/customer/:status", allCustomer);
router.post("/customer", createCustomer);

module.exports = router;
