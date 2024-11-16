const Accounts = require("../models/accounts");
const Installment = require("../models/Installment");
const Showroom = require("../models/Showroom");

exports.createInstallment = async (req, res, next) => {
  try {
    const installment = req.body;
    const { showroom, amount, type } = req.body;

    const filterShowroom = await Showroom.findOne({ name: showroom });
    if (!filterShowroom) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Showroom not found",
      });
    }

    let cashDue = filterShowroom.cashDue;
    let percentDue = filterShowroom.percentDue;
    let remainingPayment = parseInt(amount); // Initial payment amount

    // Deduct from cashDue and percentDue based on the payment amount
    if (remainingPayment <= cashDue) {
      // Payment is less than or equal to cashDue
      cashDue -= remainingPayment;
      remainingPayment = 0;
    } else {
      // Payment is more than cashDue
      remainingPayment -= cashDue;
      cashDue = 0;

      // Deduct the remaining payment from percentDue
      percentDue -= remainingPayment;
      if (percentDue < 0) percentDue = 0; // Ensure it doesn't go negative
    }

    // Update the showroom's cashDue and percentDue in the database
    filterShowroom.cashDue = cashDue;
    filterShowroom.percentDue = percentDue;
    await filterShowroom.save();

    if (type === "cash") {
      // Update showroom balance
      filterShowroom.remainingBalance += parseInt(amount);
      await filterShowroom.save();
    } else {
      // Update the balance for non-cash types
      const paymentAccount = await Accounts.findOne({ code: type });
      if (paymentAccount) {
        paymentAccount.remainingBalance += parseInt(amount);
        await paymentAccount.save();
      }
    }

    console.log(filterShowroom);

    // Save the new installment record
    const newInstallment = new Installment(installment);
    const data = await newInstallment.save();

    // const data = "";

    res.status(200).json({
      success: true,
      status: 200,
      message: "Installment Created",
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
      message: "Installments Retrieved",
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
