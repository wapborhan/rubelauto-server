const Leads = require("../../models/Leads");

const viewSingleLead = async (cursor) => {
  const lead = await Leads.find(cursor);

  return lead;
};

module.exports = viewSingleLead;
