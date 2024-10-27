const {
  createCustomer,
  allCustomer,
  cardCustomer,
  seizedCustomer,
  paidCustomer,
  docUpdate,
} = require("../controllers/customer");

const router = require("express").Router();

router
  .post("/", createCustomer)
  .get("/all/:status", allCustomer)
  .get("/:cardNo", cardCustomer)
  .patch("/seized/:cardNo", seizedCustomer)
  .patch("/paid/:cardNo", paidCustomer)
  .patch("/documents/update/:cardNo", docUpdate);

module.exports = router;
