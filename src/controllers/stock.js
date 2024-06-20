const Stocks = require("../models/Stocks");

const allStock = async (req, res) => {
  const result = await Stocks.find();
  res.send(result);
};

const createStock = async (req, res) => {
  const stockData = req.body;

  const newStock = new Stocks(stockData);
  const result = await newStock.save();

  res.send(result);
};

module.exports = { allStock, createStock };
