const Supliers = require("../models/Suplier");
var ObjectId = require("mongoose").Types.ObjectId;

const createSuplier = async (req, res) => {
  const suplierData = req.body;

  const saveSuplier = new Supliers(suplierData);
  const result = await saveSuplier.save();
  res.status(200).send("Supplier Added");
};

const allSuplier = async (req, res) => {
  const result = await Supliers.find({});
  res.status(200).send(result);
};

const singleSuplier = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };

  const result = await Supliers.findOne(filter);

  res.status(200).send(result);
};

module.exports = { createSuplier, allSuplier, singleSuplier };
