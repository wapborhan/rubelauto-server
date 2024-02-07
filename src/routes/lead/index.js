const { createLead, allLead, singleLead } = require("../../api/lead");

const router = require("express").Router();

router.get("/lead", allLead);
router.get("/lead/:id", singleLead);
router.post("/lead", createLead);

module.exports = router;
