const { createCustomer, allLead } = require("../../api/customer");

const router = require("express").Router();

// router.get("/customer", allCustomer);
router.get("/customer", allLead);
router.post("/customer", createCustomer);

module.exports = router;
