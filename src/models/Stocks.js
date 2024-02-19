const { model, Schema } = require("mongoose");

const stockSchema = new Schema({
  stockStatus: { type: String },
  receivedDate: { type: Date },
  modelCode: { type: String },
  brandName: { type: String },
  modelName: { type: String },
  engine: { type: String },
  chassis: { type: String },
  color: { type: String },
  showroomName: { type: String },
  showroomCode: { type: String },
  categories: { type: String },
  stock: { type: String },
});

const Stocks = model("stocks", stockSchema);

module.exports = Stocks;
