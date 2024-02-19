const Installment = require("../../models/Installment");

const viewPayment = async (query) => {
  const customers = await Installment.find(query);

  return customers;
};

module.exports = viewPayment;
