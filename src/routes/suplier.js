const { createSuplier, allSuplier } = require("../controllers/suplier");

const router = require("express").Router();

router.route("/suplier").get(allSuplier).post(createSuplier);

module.exports = router;
