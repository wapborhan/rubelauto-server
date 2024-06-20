const {
  createCustomer,
  allCustomer,
  cardCustomer,
} = require("../controllers/customer");

const router = require("express").Router();

router.route("/customers/:status").get(allCustomer);
router.route("/customer/:cardNo").get(cardCustomer);
router.route("/customer").post(createCustomer);

module.exports = router;
