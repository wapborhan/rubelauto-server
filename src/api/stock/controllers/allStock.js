const viewStock = require("../../../lib/stock/viewStock");

const allStock = async (req, res) => {
  // const query = req.query;
  const result = await viewStock();
  res.send(result);
};

module.exports = allStock;
