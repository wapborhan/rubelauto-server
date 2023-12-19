const Customer = require("../../models/Customer");

const viewLead = async (query) => {
  const leads = await Customer.find(query);
  return leads;
};

module.exports = viewLead;
