const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  quatity: Number,
  // product: Product,
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
