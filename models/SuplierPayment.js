const { model, Schema } = require("mongoose");

const paymentSchema = new Schema(
  {
    supplierId: { type: String },
    paymentDate: { type: Date },
    payeAccountNumber: { type: String },
    amount: { type: Number },
    notes: { type: String },
    payMethod: { type: String },
  },
  { versionKey: false }
);

const SuplierPayment = model("supplierPayment", paymentSchema);

module.exports = SuplierPayment;
