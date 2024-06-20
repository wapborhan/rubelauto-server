const Products = require("../models/Products");

const allProduct = async (req, res) => {
  const result = await Products.find();
  res.send(result);
};

const createProduct = async (req, res) => {
  const prodData = req.body;

  const newCustomer = new Products(prodData);
  const result = await newCustomer.save();

  res.send(result);
};

module.exports = { allProduct, createProduct };
