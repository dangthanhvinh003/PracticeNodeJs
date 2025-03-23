const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
//shape data
const ProductSchema = new mongoose.Schema({
  // Auto increment
  // install library npm install mongoose-sequence
  productId: { type: Number, unique: true }, // Số tự động tăng
  name: { type: String },
  img: { type: String },
  type: { type: String },
  price: { type: String },
  quantity: { type: Number },
});
// Kích hoạt auto-increment cho userId
ProductSchema.plugin(AutoIncrement, { inc_field: "productId" });
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
