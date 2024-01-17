//
const viewCustomer = require("../../../lib/customer/viewCustomer");

const allCustomer = async (req, res) => {
  const cusData = req.params.status;
  const cursor = { cardStatus: cusData };
  const result = await viewCustomer(cursor);

  res.send(result);
};

module.exports = allCustomer;
