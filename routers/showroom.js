const { createShowroom, allShowroom } = require("../controllers/showroom");

const router = require("express").Router();

router.get("/", allShowroom).post("/", createShowroom);

module.exports = router;
