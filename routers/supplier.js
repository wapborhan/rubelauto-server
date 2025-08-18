const {
  createSupplier,
  allSupplier,
  updateSupplier,
  singleSupplier,
  paymentSupplier,
  supplierStatement,
} = require("../controllers/supplier");

const router = require("express").Router();

router
  .get("/", allSupplier)
  .post("/", createSupplier)
  .get("/:id", singleSupplier)
  .patch("/:id", updateSupplier)
  .post("/payment/:id", paymentSupplier)
  .get("/:id/statement", supplierStatement);

module.exports = router;
