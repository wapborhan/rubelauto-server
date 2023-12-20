const viewProduct = require("../../../lib/product/viewProduct");

const allProduct = async (req, res) => {
  // const query = req.query;
  const result = await viewProduct();
  res.send(result);
};

module.exports = allProduct;
