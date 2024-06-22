const Supliers = require("../models/Suplier");

const allSuplier = async (req, res) => {
  const result = await Supliers.find({});
  res.status(200).send(result);
};

const createSuplier = async (req, res) => {
  const suplierData = req.body;

  const saveSuplier = new Supliers(suplierData);
  const result = await saveSuplier.save();
  res.status(200).send("Supplier Added");
};

module.exports = { createSuplier, allSuplier };
