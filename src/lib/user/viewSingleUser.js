const Users = require("../../models/Users");

const viewSingleUser = async (cursor) => {
  const leads = await Users.find(cursor);
  return leads;
};

module.exports = viewSingleUser;
