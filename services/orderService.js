const Order = require("../model/Order");
const User = require("../model/User");
const OrderItem = require("../model/OrderItem");
const mongoose = require("mongoose");

const getAll = async () => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!orderList) throw new Error("Some things went wrong");
  return orderList;
};
const createOrder = async (data) => {
  if (!data.orderItems || !data.user)
    throw new Error("User and orderItems is required");

  const isValid = mongoose.isValidObjectId(data.user);
  if (!isValid) throw new Error("Id is invalid");
  const user = await User.findOne({ _id: data.user });
  if (!user) throw new Error("USer not found");

  const orderItemsIds = await Promise.all(
    data.orderItems.map(async (a) => {
      let orderItem = await OrderItem.create({
        quantity: a.quantity,
        order: a.product,
      });
      return orderItem.id;
    })
  );

  const totalPrices = await Promise.all(
    orderItemsIds.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );
  const result = await Order.create({
    orderItems: orderItemsIds,
    shippingAddress: data.email,
    city: data.city,
    zip: data.zip,
    country: data.country,
    phone: data.phone,
    user: data.user,
    totalPrice: totalPrices.reduce((a, b) => a + b, 0),
  });
  return result;
};
const orderDetail = async (id) => {
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) throw new Error("Id is invalid");

  const order = await Order.findById(id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });
  if (!order) throw new Error("Order not found");
  return order;
};
const updateOrder = async (orderData) => {
  const result = await Order.findByIdAndUpdate(
    orderData.id,
    {
      status: orderData.status,
    },
    { new: true }
  );

  if (!result) {
    throw new Error("The Order cannot be updated");
  }

  return result;
};
const deleteOrder = async (id) => {
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) throw new Error("Id is invalid");

  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error("Order not found");
  await Promise.all(
    order.orderItems.map(async (orderItem) => {
      await OrderItem.findByIdAndDelete(orderItem);
    })
  );
  return order;
};
const getTotalSales = async () => {
  const totalSales = await Order.aggregate([
    {
      $group: { _id: null, totalSales: { $sum: "$totalPrice" } },
    },
  ]);
  if (!totalSales) throw new Error("Some things went wrong");
  return totalSales;
};
const getCount = async () => {
  const orderCount = await Order.countDocuments();
  if (!orderCount) throw new Error("Some things went wrong");
  return orderCount;
};
const getUserOrders = async (userId) => {
  const orderList = await Order.find({ user: userId })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });
  if (!orderList) throw new Error("Some things went wrong");
  return orderList;
};
module.exports = {
  getAll,
  createOrder,
  orderDetail,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getCount,
  getUserOrders,
};
