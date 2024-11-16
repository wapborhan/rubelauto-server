const Accounts = require("../models/accounts");
const Cost = require("../models/Cost");
const Showroom = require("../models/Showroom");

exports.createCost = async (req, res, next) => {
  const costData = req.body;
  const { amount, showroom } = req.body;
  try {
    if (showroom === "Head Office") {
      const filterAccounts = await Accounts.findOne({ name: showroom });
      filterAccounts.remainingBalance -= parseInt(amount);
      await filterAccounts.save();
    } else {
      const filterShowroom = await Showroom.findOne({ name: showroom });
      filterShowroom.remainingBalance -= parseInt(amount);
      await filterShowroom.save();
    }

    const newCost = new Cost(costData);
    const data = await newCost.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Cost Created",
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

exports.allCost = async (req, res, next) => {
  const { showroom } = req.query;

  try {
    const data =
      showroom === "Head Office"
        ? await Cost.find()
        : await Cost.find({ showroom });

    res.status(200).json({
      success: true,
      status: 200,
      message: `${data.length} Cost`,
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
