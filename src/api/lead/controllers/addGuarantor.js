const guarantorAdd = require("../../../lib/lead/guarantorAdd");

const addGuarantor = (req, res) => {
  const leadData = req.body;
  const id = req.params.id;

  console.log(leadData);

  const result = guarantorAdd(id, leadData);

  res.send(result);
};

module.exports = addGuarantor;
