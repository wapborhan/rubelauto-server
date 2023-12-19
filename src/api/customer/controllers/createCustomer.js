const addCustomer = require("../../../lib/customer/addCustomer");

const createCustomer = (req, res) => {
  const cusData = req.body;

  const result = addCustomer(cusData);

  res.send(result);
};

module.exports = createCustomer;
