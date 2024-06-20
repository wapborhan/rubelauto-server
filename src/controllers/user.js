const Users = require("../models/Users");
var ObjectId = require("mongoose").Types.ObjectId;

const createUser = (req, res) => {
  const user = req.body;

  const newUser = new Users(user);
  const result = newUser.save();

  res.send(result);
};

const allUser = async (req, res) => {
  const result = await Users.find();
  res.send(result);
};

const singleUser = async (req, res) => {
  // const id = req.params;
  // const filter = { _id: new ObjectId(id) };
  const email = req.query.email;
  const filter = { email: email };
  const result = await Users.find(filter);
  res.send(result);
};

module.exports = { allUser, createUser, singleUser };
