const Order = require("../model/Order");
const orderService = require("../services/orderService");

const getAll = async (req, res) => {
  try {
    const result = await orderService.getAll();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const orderDetail = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(404).json({ message: "id is required" });
    const result = await orderService.orderDetail(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  createOrder,
  orderDetail,
};
