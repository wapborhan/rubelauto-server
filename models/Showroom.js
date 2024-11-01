const { model, Schema } = require("mongoose");

const showroomSchema = new Schema(
  {
    name: { type: String },
    code: { type: String, unique: true, lowercase: true },
    address: { type: String },
    cashDue: { type: Number },
    percentDue: { type: Number },
    remainingBalance: { type: Number },
  },
  { versionKey: false }
);

const Showroom = model("showrooms", showroomSchema);

module.exports = Showroom;
