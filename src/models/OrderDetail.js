import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderDetailSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true }, 
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, 
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
});

const OrderDetail = model("OrderDetail", OrderDetailSchema);

export default OrderDetail;