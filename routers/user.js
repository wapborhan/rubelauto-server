const {
  createUser,
  allUser,
  singleUser,
  updateUser,
} = require("../controllers/user");

const router = require("express").Router();

router
  .get("/all", allUser)
  .post("/", createUser)
  .get("/", singleUser)
  .patch("/", updateUser);

module.exports = router;
