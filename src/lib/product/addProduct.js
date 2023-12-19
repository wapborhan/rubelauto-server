// addProduct
const Products = require("../../models/Products");

const addProduct = async (prodData) => {
  const newCustomer = new Products(prodData);

  const savedCustomer = await newCustomer.save();

  return savedCustomer;
};

module.exports = addProduct;
