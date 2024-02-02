const { createUser, allUser } = require("../../api/user");

const router = require("express").Router();

router.get("/users", allUser);
router.post("/user", createUser);

module.exports = router;
