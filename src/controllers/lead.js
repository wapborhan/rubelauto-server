const Leads = require("../models/Leads");
var ObjectId = require("mongoose").Types.ObjectId;

const createLead = async (req, res) => {
  const leadData = req.body;

  const newLead = new Leads(leadData);

  const result = await newLead.save();

  res.send(result);
};

const allLead = async (req, res) => {
  const result = await Leads.find();
  res.send(result);
};

const singleLead = async (req, res) => {
  const leadId = req.params.id;

  const cursor = { _id: new ObjectId(leadId) };
  const result = await Leads.find(cursor);

  res.send(result);
};

const addGuarantor = async (req, res) => {
  const leadData = req.body;
  const id = req.params.id;

  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $push: { guarantor: leadData },
  };

  const result = await Leads.updateOne(query, updateDoc);

  res.send(result);
};

module.exports = { createLead, allLead, singleLead, addGuarantor };
