const addLead = require("../../../lib/lead/addLead");

const createLead = (req, res) => {
  const leadData = req.body;

  const result = addLead(leadData);

  res.send(result);
};

module.exports = createLead;
