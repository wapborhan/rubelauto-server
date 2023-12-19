const addProduct = require("../../../lib/product/addProduct");

const createProduct = (req, res) => {
  const prodData = req.body;

  const result = addProduct(prodData);

  res.send(result);
};

module.exports = createProduct;
