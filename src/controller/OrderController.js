const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Product = require("../models/Product");

const postAddOrder = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  let userId = req.session.user.userId;
  const { productId, quantity } = req.body;

  try {
    // Find or create a pending order for the user
    let order = await Order.findOne({ userId, status: "Pending" });
    if (!order) {
      order = await Order.create({ userId });
    }

    // Add or update the order detail
    let orderDetail = await OrderDetail.findOne({
      orderId: order.orderId,
      productId,
    });
    if (orderDetail) {
      orderDetail.quantity += Number(quantity);
      await orderDetail.save();
    } else {
      await OrderDetail.create({ orderId: order.orderId, productId, quantity });
    }

    // Update product quantity
    let product = await Product.findOne({ productId });
    if (product) {
      product.quantity -= Number(quantity);
      await product.save();
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  let userId = req.session.user.userId;

  try {
    let order = await Order.findOne({ userId, status: "Pending" });
    if (!order) {
      return res.render("Cart", { orderDetails: [], total: 0 });
    }

    // Get order details
    let orderDetails = await OrderDetail.find({ orderId: order.orderId });

    // Get productIds from orderDetails
    let productIds = orderDetails.map((d) => d.productId);

    // Find matching products using productId
    let products = await Product.find({ productId: { $in: productIds } });

    // Create a map for quick lookup
    let productMap = {};
    products.forEach((product) => {
      productMap[product.productId] = product;
    });

    // Attach product data to orderDetails manually
    orderDetails = orderDetails.map((detail) => {
      const product = productMap[detail.productId] || {};
      return {
        ...detail.toObject(),
        productId: product, // replace productId with the full product object
      };
    });

    // Calculate total
    let total = orderDetails.reduce(
      (sum, detail) => sum + detail.quantity * (detail.productId.price || 0),
      0
    );

    res.render("Cart", { orderDetails, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postAddOrder,
  getCart,
};
