const Order = require("../models/Orders");

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
  const { userId, productId, quantity } = req.body;
  console.log("Received data:", req.body); // kiểm tra dữ liệu nhận được

  const newOrder = new Order({ userId, productId, quantity });
  await newOrder.save();
  return res.status(200).json({
    data: newOrder,
  });
};
module.exports = {
  getAllOrder,
  getOrderById,
  postAddOrder,
};
