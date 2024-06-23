//
const Customer = require("../models/Customers");
const Leads = require("../models/Leads");

const allCustomer = async (req, res) => {
  const cusData = req.params.status;
  const { showroom } = req.query;
  let cursor;

  if (showroom === "Head Office") {
    cursor = { "cardStatus.type": cusData };
  } else {
    cursor = { cardStatus: cusData, showRoom: showroom };
  }

  const result = await Customer.find(cursor);

  res.send(result);
};

const cardCustomer = async (req, res) => {
  const cusData = req.params.cardNo;

  const cursor = { cardno: cusData };
  const result = await Customer.find(cursor);

  res.send(result);
};

const createCustomer = async (req, res) => {
  try {
    const cusData = req.body;
    const { leadId } = req.query;
    const { status } = req.query;

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

    // Delete from Leads
    await Leads.findByIdAndDelete(leadId);

    // Add customer
    const newCustomer = new Customer(cusData);
    await newCustomer.save();

    // Succees
    res.status(200).send({ message: "Customer Added" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json("Internal Server Error");
  }
};

const seizedCustomer = async (req, res) => {
  try {
    const seizedData = req.body;
    const { cardNo } = req.params;

    const { type, date, staff, seizedCost, comments } = seizedData;
    if (!type || !date || !staff || !seizedCost || !comments) {
      return res.status(400).send({ message: "All fields are required" });
    }

    console.log(seizedData);

    // Find the user by username and update their links field
    const updatedUser = await Customer.findOneAndUpdate(
      { cardno: cardNo },
      {
        $set: {
          "cardStatus.type": type,
          "cardStatus.date": date,
          "cardStatus.staff": staff,
          "cardStatus.seizedCost": seizedCost,
          "cardStatus.comments": comments,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { allCustomer, cardCustomer, createCustomer, seizedCustomer };
