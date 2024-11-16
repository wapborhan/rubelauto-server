const { model, Schema } = require("mongoose");

const CostSchema = new Schema(
  {
    date: { type: Date },
    staffEmail: { type: String },
    categories: { type: String },
    showroom: { type: String },
    description: { type: String },
    amount: { type: Number },
  },
  { versionKey: false }
);

const Cost = model("cost", CostSchema);

module.exports = Cost;
