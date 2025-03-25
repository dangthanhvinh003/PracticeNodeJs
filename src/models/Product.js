const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
//shape data
const ProductSchema = new mongoose.Schema({
  productId: { 
    type: Number, 
    unique: true 
  },
  name: { 
    type: String, 
    required: [true, 'Product name is required'] 
  },
  img: { 
    type: String, 
    required: [true, 'Image URL is required'] 
  },
  type: { 
    type: String,
    default: 'general' 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  quantity: { 
    type: Number, 
    default: 0,
    min: [0, 'Quantity cannot be negative'] 
  }
});
// Kích hoạt auto-increment cho userId
ProductSchema.plugin(AutoIncrement, { 
  inc_field: 'productId',
  start_seq: 1 // Bắt đầu từ số 1
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
