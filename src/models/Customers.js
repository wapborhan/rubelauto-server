const { model, Schema } = require("mongoose");

const customerSchema = new Schema(
  {
    saleStatus: { type: String },
    saledate: { type: Date },
    productCond: { type: String },
    cardno: { type: String },
    showRoom: { type: String },
    cardStatus: { type: Object },
    customerInfo: {
      name: { type: String },
      coname: { type: String },
      nid: { type: String },
      address: { type: String },
      number: { type: String },
      location: { type: String },
      media: { type: String },
      guarantor: { type: Array },
    },
    productInfo: {
      type: { type: String },
      models: { type: String },
      engine: { type: String },
      chassis: { type: String },
      color: { type: String },
    },
    accountInfo: {
      saleprice: { type: Number },
      dpamount: { type: Number },
      term: { type: Number },
      percentage: { type: Number },
      insdate: { type: Date },
      hireprice: { type: Number },
      insamount: { type: Number },
      conddate: { type: Date },
      condamount: { type: Number },
      agrefee: { type: Number },
    },
    installment: { type: Array },
  },
  { versionKey: false }
);

const CustomerModel = model("customers", customerSchema);

module.exports = CustomerModel;
