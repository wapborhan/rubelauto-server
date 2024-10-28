const {
  createLead,
  allLead,
  singleLead,
  updateLead,
  addGuarantor,
} = require("../controllers/lead");

const router = require("express").Router();

router
  .get("/", allLead)
  .post("/", createLead)
  .get("/:id", singleLead)
  .patch("/:id", updateLead)
  .put("/addguarantor/:id", addGuarantor);

module.exports = router;
