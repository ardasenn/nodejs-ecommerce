const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  //   orderItems: [orderItems],
  shippingAddress: String,
  city: String,
  zip: String,
  country: String,
  phone: String,
  status: String,
  totalPrice: String,
  //   user:User
  dateOrdered: Date,
});

module.exports = mongoose.model("Order", orderSchema);
