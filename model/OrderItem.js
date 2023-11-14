const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});
orderItemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderItemSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("OrderItem", orderItemSchema);
