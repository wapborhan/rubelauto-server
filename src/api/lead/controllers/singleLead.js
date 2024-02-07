const viewSingleLead = require("../../../lib/lead/viewSingleLead");

var ObjectId = require("mongoose").Types.ObjectId;

const singleLead = async (req, res) => {
  const leadId = req.params.id;

  const cursor = { _id: new ObjectId(leadId) };
  const result = await viewSingleLead(cursor);

  res.send(result);
};

module.exports = singleLead;
