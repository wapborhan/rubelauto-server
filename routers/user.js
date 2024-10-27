const { createUser, allUser, singleUser } = require("../controllers/user");

const router = require("express").Router();

router
  .get("/all", allUser)
  .post("/", createUser)
  .get("/", singleUser)
  .post("/", singleUser);

module.exports = router;
