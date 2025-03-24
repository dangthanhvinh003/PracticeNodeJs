const Product = require("../models/Product");

const getAllProduct = async (req, res) => {
  let result = await Product.find({});
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};
const getProductById = async (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send("Invalid product ID");
  }
  let result = await Product.findOne({ productId: id });
  if (!result) {
    return res.status(404).send("Product not found");
  }
  res.render("Product/DetailProduct", { productDetail: result });
};

const postUpdateProduct = async (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let img = req.body.img;
  let type = req.body.type;
  let price = req.body.price;
  let quantity = req.body.quantity;

  //const { id, name, email, img } = req.body;
  let result = await Product.updateOne(
    { productId: id },
    { name: name, img: img, type: type, price: price, quantity: quantity }
  );
  console.log(result);

  return res.status(200).json({
    data: result,
  });
};

const postAddProduct = async (req, res) => {
  let name = req.body.name;
  let img = req.body.img;
  let type = req.body.type;
  let price = req.body.price;
  let quantity = req.body.quantity;
  //const { id, name, email, img } = req.body;
  let user = await Product.create({
    name: name,
    img: img,
    type: type,
    price: price,
    quantity: quantity,
  });

  console.log(user);

  return res.status(200).json({
    data: user,
  });
};
module.exports = {
  getAllProduct,
  getProductById,
  postAddProduct,
  postUpdateProduct,
};
