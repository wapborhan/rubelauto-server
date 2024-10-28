const { docUpdate } = require("../controllers/customer");

const router = require("express").Router();

router.patch("/update/:cardNo", docUpdate);

module.exports = router;
