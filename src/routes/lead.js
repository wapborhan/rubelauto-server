const {
  createLead,
  allLead,
  singleLead,
  addGuarantor,
} = require("../controllers/lead");

const router = require("express").Router();

router.get("/lead", allLead).post(createLead);
router.get("/lead/:id", singleLead);
router.put("/lead/addguarantor/:id", addGuarantor);

module.exports = router;
