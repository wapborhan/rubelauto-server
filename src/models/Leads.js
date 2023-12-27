const { model, Schema } = require("mongoose");

const leadSchema = new Schema({
  status: { type: String },
  name: { type: String },
  coname: { type: String },
  nid: { type: String },
  address: { type: String },
  number: { type: Number },
  location: { type: String },
  media: { type: String },
});

const Leads = model("leads", leadSchema);

module.exports = Leads;
