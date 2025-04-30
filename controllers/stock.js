const Parts = require("../models/Parts");
const Stocks = require("../models/Stocks");

exports.allStock = async (req, res, next) => {
  try {
    const data = await Stocks.find();

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

exports.partsPurchase = async (req, res, next) => {
  try {
    const data = await Parts.find();

    res.status(200).json({
      success: true,
      status: 200,
      message: `${data.length} Parts Memo Found.`,
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

exports.createStock = async (req, res, next) => {
  try {
    const stockData = req.body;
    const { engine, chassis } = stockData;

    const existingProduct = await Stocks.findOne({ engine, chassis });

    if (existingProduct) {
      return res.status(400).json({
        message: "A product with this engine and chassis already exists.",
      });
    }
    const newStock = new Stocks(stockData);
    const data = await newStock.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: `${data.length} Products Created.`,
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

exports.createPartsStock = async (req, res, next) => {
  try {
    const stockData = req.body;

    const newStock = new Parts(stockData);
    const data = await newStock.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: `Purchase Successful.`,
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
