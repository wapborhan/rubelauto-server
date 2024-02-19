//
//
const viewPayment = require("../../../lib/payment/viewPayment");

const showPayment = async (req, res) => {
  const cardno = req.params.id;

  const query = { cardNo: cardno };
  const result = await viewPayment(query);

  res.send(result);
};

module.exports = showPayment;
