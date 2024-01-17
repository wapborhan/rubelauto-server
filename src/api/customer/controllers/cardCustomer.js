const viewCustomer = require("../../../lib/customer/viewCustomer");

const cardCustomer = async (req, res) => {
  const cusData = req.params.cardNo;

  const cursor = { cardno: cusData };
  const result = await viewCustomer(cursor);

  res.send(result);
};

module.exports = cardCustomer;
