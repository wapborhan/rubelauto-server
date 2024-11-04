const { model, Schema } = require("mongoose");

const accountsSchema = new Schema(
  {
    name: { type: String },
    code: { type: String },
    acNumber: { type: Number },
    remainingBalance: { type: Number },
  },
  { versionKey: false }
);

const Accounts = model("accounts", accountsSchema);

module.exports = Accounts;
