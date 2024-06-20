const { createUser, allUser, singleUser } = require("../controllers/user");

const router = require("express").Router();

router.route("/users", allUser).get(allUser);
router.route("/user").get(singleUser).post(createUser);

module.exports = router;
