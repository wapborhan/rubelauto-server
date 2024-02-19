const addPayment = require("../../../lib/payment/addPayment");

const createPayment = (req, res) => {
  const inslattment = req.body;
  // const noCard = req.params.cardNo;

  const result = addPayment(inslattment);

  res.send(result);
};

module.exports = createPayment;
