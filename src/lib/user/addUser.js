const Users = require("../../models/Users");

const addUser = async (user) => {
  const newUser = new Users(user);

  const result = await newUser.save();

  return result;
};

module.exports = addUser;
