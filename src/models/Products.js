const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  brand: { type: String },
  brandimg: { type: String },
  productimg: { type: String },
  product: { type: String },
  sku: { type: String },
  engine: { type: Array },
  chassis: { type: Array },
});

const Products = model("products", productSchema);

module.exports = Products;
