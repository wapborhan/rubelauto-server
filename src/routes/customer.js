const {
  createCustomer,
  allCustomer,
  cardCustomer,
  seizedCustomer,
} = require("../controllers/customer");

const router = require("express").Router();

router.route("/customers/:status").get(allCustomer);
router.route("/customer/:cardNo").get(cardCustomer);
router.route("/customer").post(createCustomer);
router.route("/customer/seized/:cardNo").patch(seizedCustomer);
// router.route("/customer/paid").patch(seizedCustomer);

module.exports = router;
