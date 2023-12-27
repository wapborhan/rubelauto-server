const { createLead } = require("../../api/lead");

const router = require("express").Router();

// router.get("/lead", allLead);
router.post("/lead", createLead);

module.exports = router;
