const { model, Schema, Types } = require("mongoose");

const partsSchema = new Schema(
  {
    supplierId: { type: String },
    supplier: { type: Types.ObjectId, ref: "supliers" },
    memoDate: { type: Date },
    MemoNo: { type: String },
    amount: { type: Number },
    transport: { type: String },
    notes: { type: String },
    receiveDate: { type: Date },
  },
  { versionKey: false }
);

const PartsPurchase = model("partsPurchase", partsSchema);

module.exports = PartsPurchase;
