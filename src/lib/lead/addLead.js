const Leads = require("../../models/Leads");

const addLead = async (leadData) => {
  const newLead = new Leads(leadData);

  const result = await newLead.save();

  return result;
};

module.exports = addLead;
