const {
  createSuplier,
  allSuplier,
  singleSuplier,
} = require("../controllers/suplier");

const router = require("express").Router();

router.get("/", allSuplier).post("/", createSuplier).get("/:id", singleSuplier);

module.exports = router;
