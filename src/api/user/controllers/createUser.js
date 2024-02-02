const addUser = require("../../../lib/user/addUser");

const createUser = (req, res) => {
  const user = req.body;

  const result = addUser(user);

  res.send(result);
};

module.exports = createUser;
