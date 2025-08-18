const { partsPurchaseShow, createPartsStock } = require("../controllers/Parts");

const router = require("express").Router();

router.get("/", partsPurchaseShow).post("/", createPartsStock);

module.exports = router;
