const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  brandImg: { type: String },
  brandName: { type: String },
  modelImg: { type: String },
  modelName: { type: String },
  categories: { type: String },
  cashPrice: { type: Number },
  creditPrice: { type: Number },
  typeCode: { type: String },
  sku: { type: String },
});

const Products = model("products", productSchema);

module.exports = Products;
