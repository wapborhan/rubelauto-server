const Showroom = require("../models/Showroom");

exports.allShowroom = async (req, res, next) => {
  try {
    const data = await Showroom.find();

    res.status(200).json({
      success: true,
      status: 200,
      message: `${data.length} Showrooms Found.`,
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

exports.createShowroom = async (req, res, next) => {
  try {
    const showroomData = req.body;
    const { name, code } = showroomData;

    const existingProduct = await Showroom.findOne({
      name: name.toLowerCase(),
      code: code.toLowerCase(),
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "A showroom with this name and code already exists.",
      });
    }
    const newStock = new Showroom(showroomData);
    const data = await newStock.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: `Showroom Created.`,
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
