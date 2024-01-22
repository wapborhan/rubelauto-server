const Customer = require("../../models/Customers");

const addPayment = async (noCard, inslattment) => {
  const query = { cardno: noCard };
  const updateDoc = {
    $push: { installment: inslattment },
  };

  const result = await Customer.updateOne(query, updateDoc);

  return result;
};

module.exports = addPayment;
