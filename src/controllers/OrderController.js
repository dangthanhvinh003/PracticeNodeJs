import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Product from "../models/Product.js";
// import vnpay from "../config/vnpay.js";
// import { ProductCode, dateFormat, VnpLocale } from "vnpay";

export const postAddOrder = async (req, res) => {
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

export const getCart = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  let userId = req.session.user.userId;

  try {
    let order = await Order.findOne({ userId, status: "Pending" });
    if (!order) {
      return res.render("Cart", { orderDetails: [], total: 0, message: "" });
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

    res.render("Cart", { orderDetails, total, message: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkout = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const userId = req.session.user.userId;

  try {
    // Find the pending order for the user
    let order = await Order.findOne({ userId, status: "Pending" });
    if (!order) {
      return res.render("Cart", { orderDetails: [], total: 0, message: "Your cart is empty." });
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

    const paymentUrl = ''
    //  vnpay.buildPaymentUrl({
    //   vnp_Amount: total,
    //   vnp_IpAddr: '127.0.0.1',
    //   vnp_TxnRef: order._id.toString(),
    //   vnp_OrderInfo: `Thanh toan don hang ${order._id}`,
    //   vnp_OrderType: ProductCode.Other,
    //   vnp_ReturnUrl: 'http://localhost:3000/vnpay-return',
    //   vnp_Locale: VnpLocale.VN,
    //   vnp_CreateDate: dateFormat(new Date()),
    //   vnp_ExpireDate: dateFormat(expireDate),
    // })

    await order.save();

    res.redirect(paymentUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};