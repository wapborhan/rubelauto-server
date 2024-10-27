const {
  createLead,
  allLead,
  singleLead,
  addGuarantor,
} = require("../controllers/lead");

const router = require("express").Router();

router
  .get("/", allLead)
  .post("/", createLead)
  .get("/:id", singleLead)
  .put("/addguarantor/:id", addGuarantor);

module.exports = router;
