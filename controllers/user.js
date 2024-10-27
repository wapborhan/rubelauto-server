const Users = require("../models/Users");
var ObjectId = require("mongoose").Types.ObjectId;

exports.createUser = async (req, res, next) => {
  try {
    const user = req.body;

    const newUser = new Users(user);
    const data = newUser.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Users Found",
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

exports.allUser = async (req, res, next) => {
  try {
    const data = await Users.find();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Users Found",
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

exports.singleUser = async (req, res, next) => {
  try {
    const email = req.query.email;
    const filter = { email: email };

    const data = await Users.find(filter);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Users Found",
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
