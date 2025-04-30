const { model, Schema } = require("mongoose");

const supplierSchema = new Schema(
  {
    bssLogoUrl: { type: String },
    bssName: { type: String },
    empName: { type: String },
    prodType: { type: String },
    email: { type: String },
    mobile: { type: String },
    address: { type: String },
    openingBalance: { type: Number },
    addedDate: { type: Date },
  },
  { versionKey: false }
);

const Suppliers = model("supliers", supplierSchema);

module.exports = Suppliers;
