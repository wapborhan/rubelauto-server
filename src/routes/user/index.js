const { createUser } = require("../../api/user");

const router = require("express").Router();

// router.get("/user", allStock);
router.post("/user", createUser);

module.exports = router;
