const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OrderDetailSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.Number, ref: "Order" }, // Số tự động tăng
  productId: { type: mongoose.Schema.Types.Number, ref: "Product" }, // Tham chiếu productId
  price: Number,
  quantity: Number,
});
const OrderDetail = mongoose.model("OrderDetail", OrderDetailSchema);

module.exports = OrderDetail;
