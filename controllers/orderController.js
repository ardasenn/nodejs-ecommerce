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
const updateOrder = async (req, res) => {
  try {
    const result = await orderService.updateOrder(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(404).json({ message: "id is required" });
    const result = await orderService.deleteOrder(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getTotalSales = async (req, res) => {
  try {
    const result = await orderService.getTotalSales();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getCountOfOrders = async (req, res) => {
  try {
    const count = await orderService.getCount();
    res.json({ count });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getUserOrders = async (req, res) => {
  try {
    if (!req?.params?.userid)
      return res.status(404).json({ message: "userid is required" });
    const result = await orderService.getUserOrders(req.params.userid);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getAll,
  createOrder,
  orderDetail,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getCountOfOrders,
  getUserOrders,
};
