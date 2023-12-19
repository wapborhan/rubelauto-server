const { model, Schema } = require("mongoose");

const customerSchema = new Schema({
  saledate: { type: Date },
  cardno: { type: String },
  showroom: { type: String },
  status: { type: String },
  customerInfo: {
    name: { type: String },
    coname: { type: String },
    nid: { type: String },
    address: { type: String },
    number: { type: String },
    location: { type: String },
    media: { type: String },
  },
  productInfo: {
    productType: { type: String },
    model: { type: String },
    engine: { type: String },
    chassis: { type: String },
  },
  accountInfo: {
    saleprice: { type: String },
    dpamount: { type: String },
    term: { type: String },
    percentage: { type: String },
    insdate: { type: String },
    hireprice: { type: String },
    insamount: { type: String },
    conddate: { type: String },
    condamount: { type: String },
  },
  installment: { type: Array },
});

const CustomerModel = model("customers", customerSchema);

module.exports = CustomerModel;
