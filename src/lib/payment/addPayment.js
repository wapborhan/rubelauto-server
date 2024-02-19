const Installment = require("../../models/Installment");

const addPayment = async (inslattment) => {
  // const query = { cardno: noCard };
  // const updateDoc = {
  // $push: { installment: inslattment },
  // };
  // const result = await Customer.updateOne(query, updateDoc);

  const newInstallment = new Installment(inslattment);

  const result = await newInstallment.save();

  return result;
};

module.exports = addPayment;
