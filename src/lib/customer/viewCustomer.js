const Customer = require("../../models/Customers");

const viewCustomer = async (cursor) => {
  const customers = await Customer.find(cursor);

  return customers;
};

module.exports = viewCustomer;
