const Products = require("../models/Products");

exports.allProduct = async (req, res, next) => {
  try {
    const data = await Products.find();

    res.status(200).json({
      success: true,
      status: 200,
      message: `${data.length} Products Found.`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

exports.createProduct = async (req, res, next) => {
  const prodData = req.body;
  try {
    const newProduct = new Products(prodData);
    const data = await newProduct.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Created",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};
