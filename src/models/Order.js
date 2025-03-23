const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OrderSchema = new mongoose.Schema({
  orderId: { type: Number, unique: true }, // Số tự động tăng
  userId: { type: mongoose.Schema.Types.Number, ref: "User" }, // Tham chiếu userId
  status: {
    type: String,
    enum: ["Pending", "Success", "Cancel"],
    default: "Pending",
  },
  total: Number,
  orderDate: { type: Date, default: Date.now },
});
OrderSchema.plugin(AutoIncrement, { inc_field: "orderId" });
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
