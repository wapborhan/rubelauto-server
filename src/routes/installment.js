const {
  createInstallment,
  showInstallment,
} = require("../controllers/installment");

const router = require("express").Router();

router.route("/installment/:id").get(showInstallment);
router.route("/installment/").post(createInstallment);

module.exports = router;
