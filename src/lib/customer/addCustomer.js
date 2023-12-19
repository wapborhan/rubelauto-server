const Customer = require("../../models/Customer");

const addCustomer = async (cusData) => {
  const newCustomer = new Customer(cusData);

  const savedCustomer = await newCustomer.save();

  return savedCustomer;
};

module.exports = addCustomer;
