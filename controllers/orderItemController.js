const OrderItem = require("../model/OrderItem");

const getAll = async (req, res) => {
  const orderItemList = await OrderItem.find();
  if (!orderItemList) res.status(500).json({ succes: false });
  res.send(orderItemList);
};

module.exports = {
  getAll,
};
