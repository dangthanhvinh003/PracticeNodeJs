import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["Pending", "Success", "Cancel", "Failed", "Payment"],
    default: "Pending",
    required: true,
  },
  total: { type: Number, required: true, min: 0 },
  orderDate: { type: Date, default: Date.now, required: true },
  metadata: { type: Schema.Types.Mixed }, // JSON object for metadata
});

const Order = model("Order", OrderSchema);

export default Order;
