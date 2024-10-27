const {
  createInstallment,
  showInstallment,
} = require("../controllers/installment");

const router = require("express").Router();

router.post("/", createInstallment).get("/:id", showInstallment);

module.exports = router;
