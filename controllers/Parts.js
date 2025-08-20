const PartsPurchase = require("../models/PartsPurchase");

exports.createPartsStock = async (req, res, next) => {
  try {
    const stockData = req.body;

    const newStock = new PartsPurchase(stockData);
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

exports.partsPurchaseShow = async (req, res, next) => {
  try {
    const data = await PartsPurchase.find().populate("supplierId");

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
