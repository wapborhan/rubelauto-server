const Leads = require("../../models/Leads");
var ObjectId = require("mongoose").Types.ObjectId;

const guarantorAdd = async (id, leadData) => {
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $push: { guarantor: leadData },
  };

  const result = await Leads.updateOne(query, updateDoc);

  return result;
};

module.exports = guarantorAdd;
