const { model, Schema } = require("mongoose");

const installmentSchema = new Schema({
  cardNo: { type: String },
  showroom: { type: String },
  date: { type: Date },
  amount: { type: Number },
  voucher: { type: String },
  receiver: { type: String },
  type: { type: String },
  coments: { type: String },
});

const Installment = model("installment", installmentSchema);

module.exports = Installment;
