const Accounts = require("../models/accounts");
const Income = require("../models/Income");
const Showroom = require("../models/Showroom");

exports.createIncome = async (req, res, next) => {
  const incomeData = req.body;
  const { amount, showroom } = req.body;
  try {
    if (showroom === "Head Office") {
      const filterAccounts = await Accounts.findOne({ name: showroom });
      filterAccounts.remainingBalance += parseInt(amount);
      await filterAccounts.save();
    } else {
      const filterShowroom = await Showroom.findOne({ name: showroom });
      filterShowroom.remainingBalance += parseInt(amount);
      await filterShowroom.save();
    }

    const newIncome = new Income(incomeData);
    const data = await newIncome.save();
    // const data = "";

    res.status(200).json({
      success: true,
      status: 200,
      message: "Income Created",
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

exports.allIncome = async (req, res, next) => {
  const { showroom } = req.query;

  try {
    const data =
      showroom === "Head Office"
        ? await Income.find()
        : await Income.find({ showroom });

    res.status(200).json({
      success: true,
      status: 200,
      message: `${data.length} Income`,
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
