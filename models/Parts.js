const { model, Schema } = require("mongoose");

const partsSchema = new Schema(
  {
    supplierId: { type: String },
    memoDate: { type: Date },
    MemoNo: { type: String },
    amount: { type: Number },
    transport: { type: String },
    notes: { type: String },
    receiveDate: { type: Date },
  },
  { versionKey: false }
);

const Parts = model("partsPurchase", partsSchema);

module.exports = Parts;
