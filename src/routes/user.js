const { createUser, allUser, singleUser } = require("../controllers/user");

const router = require("express").Router();

router.get("/users", allUser);
router.get("/user", singleUser).post(createUser);

module.exports = router;
