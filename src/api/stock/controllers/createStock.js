const addStock = require("../../../lib/stock/addStock");

const createStock = (req, res) => {
  const stockData = req.body;

  const result = addStock(stockData);

  res.send(result);
};

module.exports = createStock;
