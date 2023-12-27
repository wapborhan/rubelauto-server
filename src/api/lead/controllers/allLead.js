const viewLead = require("../../../lib/lead/viewLead");

const allLead = async (req, res) => {
  const result = await viewLead();
  res.send(result);
};

module.exports = allLead;
