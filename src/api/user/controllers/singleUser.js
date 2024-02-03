const viewSingleUser = require("../../../lib/user/viewSingleUser");

var ObjectId = require("mongoose").Types.ObjectId;

const allUser = async (req, res) => {
  // const id = req.params;
  // const filter = { _id: new ObjectId(id) };
  const email = req.query.email;
  const filter = { email: email };
  const result = await viewSingleUser(filter);
  res.send(result);
};

module.exports = allUser;
