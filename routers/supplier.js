const {
  createSupplier,
  allSupplier,
  updateSupplier,
  singleSupplier,
} = require("../controllers/supplier");

const router = require("express").Router();

router
  .get("/", allSupplier)
  .post("/", createSupplier)
  .get("/:id", singleSupplier)
  .patch("/:id", updateSupplier);

module.exports = router;
