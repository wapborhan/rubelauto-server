const Accounts = require("../models/accounts");
const Installment = require("../models/Installment");
const Showroom = require("../models/Showroom");

exports.createInstallment = async (req, res, next) => {
  try {
    const inslattment = req.body;
    const { showroom, amount, type } = req.body;

    const filterShowroom = await Showroom.findOne({ name: showroom });

    if (!filterShowroom) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Showroom not found",
      });
    }

    const paymentAccount = await Accounts.findOne({ code: type });

    if (type === "cash") {
      const newBalance =
        parseInt(filterShowroom.remainingBalance) + parseInt(amount);

      filterShowroom.remainingBalance = newBalance;
      await filterShowroom.save();
    } else {
      const newBalance =
        parseInt(paymentAccount.remainingBalance) + parseInt(amount);

      paymentAccount.remainingBalance = newBalance;
      await paymentAccount.save();
    }

    const newInstallment = new Installment(inslattment);
    const data = await newInstallment.save();
    // const data = "";

    res.status(200).json({
      success: true,
      status: 200,
      message: "Leads Created",
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

exports.showInstallment = async (req, res, next) => {
  try {
    const cardno = req.params.id;

    const query = { cardNo: cardno };
    const data = await Installment.find(query);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Leads Created",
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
