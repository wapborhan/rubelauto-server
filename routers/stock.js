const {
  createStock,
  allStock,
  createPartsStock,
  partsPurchase,
} = require("../controllers/stock");

const router = require("express").Router();

router
  .get("/", allStock)
  .post("/", createStock)
  .post("/parts", createPartsStock)
  .get("/parts", partsPurchase);

module.exports = router;
