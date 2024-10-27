const Supliers = require("../models/Suplier");
var ObjectId = require("mongoose").Types.ObjectId;

exports.createSuplier = async (req, res, next) => {
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

exports.allSuplier = async (req, res, next) => {
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

exports.singleSuplier = async (req, res, next) => {
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
