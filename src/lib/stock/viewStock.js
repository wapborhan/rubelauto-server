const Stocks = require("../../models/Stocks");

const viewStock = async () => {
  const stocks = await Stocks.find();
  return stocks;
};

module.exports = viewStock;
