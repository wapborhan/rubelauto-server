const { model, Schema } = require("mongoose");

const stockSchema = new Schema({
  receivedDate: { type: Date },
  modelCode: { type: String },
  brandName: { type: String },
  modelName: { type: String },
  engine: { type: String },
  chassis: { type: String },
  color: { type: String },
  showroomName: { type: String },
  showroomCode: { type: String },
});

const Stocks = model("stocks", stockSchema);

module.exports = Stocks;