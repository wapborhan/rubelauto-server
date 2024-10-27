const Installment = require("../models/Installment");

exports.createInstallment = async (req, res, next) => {
  try {
    const inslattment = req.body;
    // const noCard = req.params.cardNo;

    // const query = { cardno: noCard };
    // const updateDoc = {
    // $push: { installment: inslattment },
    // };
    // const result = await Customer.updateOne(query, updateDoc);

    const newInstallment = new Installment(inslattment);
    const data = await newInstallment.save();

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
