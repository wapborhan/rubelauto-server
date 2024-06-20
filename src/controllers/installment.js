const Installment = require("../models/Installment");

const createInstallment = async (req, res) => {
  const inslattment = req.body;
  // const noCard = req.params.cardNo;

  // const query = { cardno: noCard };
  // const updateDoc = {
  // $push: { installment: inslattment },
  // };
  // const result = await Customer.updateOne(query, updateDoc);

  const newInstallment = new Installment(inslattment);
  const result = await newInstallment.save();

  res.send(result);
};

const showInstallment = async (req, res) => {
  const cardno = req.params.id;

  const query = { cardNo: cardno };
  const result = await Installment.find(query);

  res.send(result);
};

module.exports = { createInstallment, showInstallment };
