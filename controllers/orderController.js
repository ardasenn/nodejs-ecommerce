const Order = require("../model/Order");

const getAll = async (req, res) => {
  const orderList = await Order.find();
  if (!orderList) res.status(500).json({ succes: false });
  res.send(orderList);
};

module.exports = {
  getAll,
};
