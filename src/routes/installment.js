const {
  createInstallment,
  showInstallment,
} = require("../controllers/installment");

const router = require("express").Router();

router.get("/installment/:id", showInstallment);
router.post("/installment/", createInstallment);

module.exports = router;
