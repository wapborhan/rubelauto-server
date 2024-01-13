const Stocks = require("../../models/Stocks");

const addStock = async (stockData) => {
  const newStock = new Stocks(stockData);

  const SavedStock = await newStock.save();

  return SavedStock;
};

module.exports = addStock;
