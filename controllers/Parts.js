const PartsPurchase = require("../models/PartsPurchase");

exports.createPartsStock = async (req, res, next) => {
  try {
    const { supplierId, memoDate, MemoNo } = req.body;

    // Convert memoDate to start & end of the day
    const startOfDay = new Date(memoDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(memoDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Check existing memo
    const existingMemo = await PartsPurchase.findOne({
      supplierId,
      MemoNo,
      memoDate: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingMemo) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "This memo already exists.",
        data: {},
      });
    }

    // Save new purchase
    const newStock = new PartsPurchase(req.body);
    const data = await newStock.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Purchase Successful.",
      data,
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
    const data = await PartsPurchase.find().populate("supplier");

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
