const { createUser, allUser, singleUser } = require("../../api/user");

const router = require("express").Router();

router.get("/users", allUser);
router.get("/user", singleUser);
router.post("/user", createUser);

module.exports = router;
