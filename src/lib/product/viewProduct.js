const Products = require("../../models/Products");

const viewProduct = async () => {
  const leads = await Products.find();
  return leads;
};

module.exports = viewProduct;
