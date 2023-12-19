const viewLead = require("../../../lib/customer/viewLead");

const allLead = async (req, res) => {
  const query = req.query;
  const result = await viewLead(query);
  res.send(result);
};

module.exports = allLead;
