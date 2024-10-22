const {
  createSuplier,
  allSuplier,
  singleSuplier,
} = require("../controllers/suplier");

const router = require("express").Router();

router.route("/suplier").get(allSuplier).post(createSuplier);
router.route("/suplier/:id").get(singleSuplier);

module.exports = router;
