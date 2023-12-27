const Leads = require("../../models/Leads");

const viewLead = async () => {
  const leads = await Leads.find();
  return leads;
};

module.exports = viewLead;
