const viewUser = require("../../../lib/user/viewUser");

const allUser = async (req, res) => {
  // const query = req.query;
  const result = await viewUser();
  res.send(result);
};

module.exports = allUser;
