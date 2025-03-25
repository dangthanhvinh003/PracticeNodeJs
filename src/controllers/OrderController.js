const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Product = require("../models/Product");
const { vnpay, dateFormat } = require("../config/vnpay");
const { ProductCode, VnpLocale } = require("vnpay");
const mongoose = require("mongoose");

const addProductToOrder = async (req, res) => {
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

const removeProductFromOrder = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  let userId = req.session.user.userId;
  const { productId } = req.body;
  try {
    let order = await Order.findOne({ userId, status: "Pending" });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    let orderDetail = await OrderDetail.findOne({
      orderId: order.orderId,
      productId,
    });
    if (!orderDetail) {
      return res.status(404).json({ error: "Product not found in order" });
    }

    let quantity = orderDetail.quantity;
    await orderDetail.deleteOne();

    let product = await Product.findOne({ productId });
    console.log("69", product);
    if (product) {
      product.quantity += Number(quantity);
      await product.save();
    }
    await getCart(req, res);
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

const checkout = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const userId = req.session.user.userId;
  console.log("userId", userId);
  try {
    // Find the pending order for the user
    let order = await Order.findOne({ userId, status: "Pending" });
    if (!order) {
      return res.render("Cart", {
        orderDetails: [],
        total: 0,
        message: "Your cart is empty.",
      });
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
    const total = orderDetails.reduce(
      (sum, detail) => sum + detail.quantity * (detail.productId.price || 0),
      0
    );

    // Update the order status to "Success"
    order.total = total;
    order.status = "Payment";

    // Set the expiration date to 15 minutes from now
    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 15);

    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: total,
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: order._id.toString(),
      vnp_OrderInfo: `Thanh toan don hang ${order._id}`,
      vnp_OrderType: ProductCode.Other,
      // TODO: Remove hard-coded URL
      vnp_ReturnUrl: "http://localhost:8082/Order/vnpay-return",
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(expireDate),
    });

    await order.save();

    res.redirect(paymentUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findOne({
      _id: orderId,
      userId: req.session.user.userId,
    });
    if (!order) {
      return res.status(404).send("Order not found");
    }

    const orderDetails = await OrderDetail.find({
      orderId: order.orderId,
    }).populate({
      path: "productId",
      model: "Product",
      localField: "productId", // Field in OrderDetail
      foreignField: "productId", // Field in Product
      match: { productId: { $type: "number" } },
    });

    // Filter out any orderDetails where productId is null (due to failed population)
    const validOrderDetails = orderDetails.filter(
      (detail) => detail.productId !== null
    );

    const total = validOrderDetails.reduce(
      (sum, detail) => sum + detail.quantity * detail.productId.price,
      0
    );

    res.render("Order/details", {
      order,
      orderDetails: validOrderDetails,
      total,
    });
  } catch (error) {
    console.log(JSON.stringify(error, null, 3));
    res.status(500).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  const userId = req.session.user.userId;

  try {
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    res.render("Order/list", { orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProductToOrder,
  removeProductFromOrder,
  getCart,
  checkout,
  getOrderDetails,
  getOrders,
};
