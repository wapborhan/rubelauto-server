const {
  createLead,
  allLead,
  singleLead,
  addGuarantor,
} = require("../controllers/lead");

const router = require("express").Router();

router.route("/lead").get(allLead).post(createLead);
router.route("/lead/:id").get(singleLead);
router.route("/lead/addguarantor/:id").put(addGuarantor);

module.exports = router;
