const {
  createLead,
  allLead,
  singleLead,
  addGuarantor,
} = require("../../api/lead");

const router = require("express").Router();

router.get("/lead", allLead);
router.get("/lead/:id", singleLead);
router.put("/lead/addguarantor/:id", addGuarantor);
router.post("/lead", createLead);

module.exports = router;
