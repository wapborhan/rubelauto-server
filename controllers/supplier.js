const Supliers = require("../models/Supplier");
var ObjectId = require("mongoose").Types.ObjectId;

exports.createSupplier = async (req, res, next) => {
  try {
    const suplierData = req.body;

    const saveSuplier = new Supliers(suplierData);
    const data = await saveSuplier.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Supplier Found",
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

exports.allSupplier = async (req, res, next) => {
  try {
    const data = await Supliers.find({});

    res.status(200).json({
      success: true,
      status: 200,
      message: "Supplier Found",
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

exports.singleSupplier = async (req, res, next) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };

    const data = await Supliers.findOne(filter);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Supplier Found",
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

exports.updateSupplier = async (req, res, next) => {
  try {
    const suplierData = req.body;
    const id = req.params.id;

    const { bssLogoUrl, bssName, empName, prodType, email, mobile, address } =
      suplierData;

    const updatedLead = await Supliers.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          bssLogoUrl: bssLogoUrl,
          bssName: bssName,
          empName: empName,
          prodType: prodType,
          email: email,
          mobile: mobile,
          address: address,
        },
      },
      { new: true }
    );
    if (!updatedLead) {
      return res.status(404).send({ message: "Suplier not found" });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Suplier Updated",
      data: updatedLead,
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
