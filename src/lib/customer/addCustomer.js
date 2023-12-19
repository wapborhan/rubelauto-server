const Customer = require("../../models/Customers");

const addCustomer = async (cusData) => {
  const newCustomer = new Customer(cusData);

  const savedCustomer = await newCustomer.save();

  return savedCustomer;
};

module.exports = addCustomer;
