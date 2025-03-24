import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
});

const Product = model("Product", ProductSchema);

export default Product;