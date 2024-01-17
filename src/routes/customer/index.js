const {
  createCustomer,
  allCustomer,
  cardCustomer,
} = require("../../api/customer");

const router = require("express").Router();

router.get("/customers/:status", allCustomer);
router.get("/customer/:cardNo", cardCustomer);
router.post("/customer", createCustomer);

module.exports = router;
