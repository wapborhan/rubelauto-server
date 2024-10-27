const { model, Schema } = require("mongoose");

const suplierSchema = new Schema(
  {
    bssLogoUrl: { type: String },
    bssName: { type: String },
    empName: { type: String },
    email: { type: String },
    mobile: { type: Number },
    address: { type: String },
    openingBalance: { type: Number },
    addedDate: { type: Date },
  },
  { versionKey: false }
);

const Supliers = model("supliers", suplierSchema);

module.exports = Supliers;
