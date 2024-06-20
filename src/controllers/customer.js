//
const Customer = require("../models/Customers");

const allCustomer = async (req, res) => {
  const cusData = req.params.status;
  const { showroom } = req.query;
  let cursor;

  if (showroom === "Head Office") {
    cursor = { cardStatus: cusData };
  } else {
    cursor = { cardStatus: cusData, showRoom: showroom };
  }

  const result = await Customer.find(cursor);

  res.send(result);
};

const cardCustomer = async (req, res) => {
  const cusData = req.params.cardNo;

  const cursor = { cardno: cusData };
  const result = await Customer.find(cursor);

  res.send(result);
};

const createCustomer = async (req, res) => {
  const cusData = req.body;

  const newCustomer = new Customer(cusData);

  const result = await newCustomer.save();

  res.status(200).send(result);
};

module.exports = { allCustomer, cardCustomer, createCustomer };
