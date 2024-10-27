//
const Customer = require("../models/Customers");
const Leads = require("../models/Leads");
const Stocks = require("../models/Stocks");

exports.createCustomer = async (req, res, next) => {
  try {
    const cusData = req.body;
    const { leadId } = req.query;
    const { status } = req.query;
    const { engine } = req.body.productInfo;

    // Crad No. Existing Check
    if (status !== "cash") {
      const existingCustomer = await Customer.findOne({
        cardno: cusData?.cardno,
      });
      if (existingCustomer) {
        return res.status(409).json("Card No already exists");
      }
    }

    // Engine & Chassis Existing Check
    const existingEngine = await Customer.findOne({
      "productInfo.engine": cusData?.productInfo?.engine,
    });
    const existingChassis = await Customer.findOne({
      "productInfo.chassis": cusData?.productInfo?.chassis,
    });

    if (existingEngine && existingChassis) {
      return res.status(409).json("Engine No and Chassis No already exists");
    }

    const stockData = await Stocks.findOne({ engine: engine });
    if (!stockData) {
      return res.status(404).json("Stock with this engine not found");
    }

    // Add customer
    const newCustomer = new Customer(cusData);
    await newCustomer.save();

    // Delete stock by engine
    await Stocks.findOneAndDelete({ engine: engine });

    // Delete from Leads
    await Leads.findByIdAndDelete(leadId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Leads Created",
      data: newCustomer,
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

exports.allCustomer = async (req, res, next) => {
  try {
    const cusData = req.params.status;
    const { showroom } = req.query;
    let cursor;

    if (showroom === "Head Office") {
      cursor = { "cardStatus.type": cusData };
    } else {
      cursor = { cardStatus: cusData, showRoom: showroom };
    }

    const data = await Customer.find(cursor);

    res.status(200).json({
      success: true,
      status: 200,
      message: "All Customer",
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

exports.cardCustomer = async (req, res, next) => {
  try {
    const cusData = req.params.cardNo;

    const cursor = { cardno: cusData };
    const data = await Customer.find(cursor);

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

exports.seizedCustomer = async (req, res, next) => {
  try {
    const seizedData = req.body;
    const { cardNo } = req.params;

    const { type, date, staff, seizedCost, coments } = seizedData;
    // if (!type || !date || !staff || !seizedCost || !comments) {
    //   return res.status(400).send({ message: "All fields are required" });
    // }

    console.log(seizedData);

    // Find the user by username and update their links field
    const updatedUser = await Customer.findOneAndUpdate(
      { cardno: cardNo },
      {
        $set: {
          "cardStatus.type": type,
          "cardStatus.seizedDate": date,
          "cardStatus.staff": staff,
          "cardStatus.seizedCost": seizedCost,
          "cardStatus.coments": coments,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Leads Created",
      data: updatedUser,
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

exports.paidCustomer = async (req, res, next) => {
  const paidData = req.body;
  const { cardNo } = req.params;

  const { paidDate, staff, type, coments } = paidData;

  try {
    const updatedUser = await Customer.findOneAndUpdate(
      { cardno: cardNo },
      {
        $set: {
          "cardStatus.type": type,
          "cardStatus.paidDate": paidDate,
          "cardStatus.staff": staff,
          "cardStatus.coments": coments,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Leads Created",
      data: updatedUser,
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

exports.docUpdate = async (req, res, next) => {
  const paidData = req.body;
  const { cardNo } = req.params;

  const { staff, docStatus, docDate } = paidData;
  try {
    const updatedUser = await Customer.findOneAndUpdate(
      { cardno: cardNo },
      {
        $set: {
          "cardStatus.staff": staff,
          "cardStatus.docStatus": docStatus,
          "cardStatus.docDate": docDate,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "Customer not found" });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Leads Created",
      data: updatedUser,
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
