const Users = require("../../models/Users");

const viewUser = async () => {
  const leads = await Users.find();
  return leads;
};

module.exports = viewUser;
