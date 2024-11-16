const { model, Schema } = require("mongoose");

const IncomeSchema = new Schema(
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

const Income = model("income", IncomeSchema);

module.exports = Income;
