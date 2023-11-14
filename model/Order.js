const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress: String,
  city: String,
  zip: String,
  country: String,
  phone: String,
  status: {
    type: String,
    default: "Pending",
  },
  totalPrice: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Order", orderSchema);
