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
        product: a.product,
      });
      return orderItem.id;
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
    totalPrice: data.totalPrice,
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
module.exports = {
  getAll,
  createOrder,
  orderDetail,
};
