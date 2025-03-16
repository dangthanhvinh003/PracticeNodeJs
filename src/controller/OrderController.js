const Order = require("../models/Orders");
const Product = require("../models/Products");
const getAllOrder = async (req, res) => {
  let result = await Order.find({});
  console.log(result);
  //res.render("Homepage", { ListOrder: result });
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};
const getOrderById = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let result = await Order.find({ orderId: id });
  console.log(result);
  //res.render("Homepage", { ListUser: result });
  return res.status(200).json({
    data: result,
  });
};

const postAddOrder = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  let userId = req.session.user.userId;

  const { productId, quantity } = req.body;
  console.log("Received data:", req.body); // kiểm tra dữ liệu nhận được

  const newOrder = new Order({ userId, productId, quantity });
  await newOrder.save();

  //update quantity

  let product = await Product.findOne({ productId });
  console.log("check product after get : " + product);
  if (product) {
    let newQuantity = product.quantity - Number(quantity);
    console.log("check quantity after count : " + newQuantity);
    await Product.updateOne({ productId }, { quantity: newQuantity });
  }
  return res.redirect("/");
};
module.exports = {
  getAllOrder,
  getOrderById,
  postAddOrder,
};
