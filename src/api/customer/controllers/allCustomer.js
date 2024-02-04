//
const viewCustomer = require("../../../lib/customer/viewCustomer");

const allCustomer = async (req, res) => {
  const cusData = req.params.status;
  const { showroom } = req.query;
  let cursor;

  if (showroom === "Head Office") {
    cursor = { cardStatus: cusData };
  } else {
    cursor = { cardStatus: cusData, showRoom: showroom };
  }

  const result = await viewCustomer(cursor);

  res.send(result);
};

module.exports = allCustomer;
