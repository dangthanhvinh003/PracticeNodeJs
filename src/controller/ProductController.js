const Product = require("../models/Products");

const getAllProduct = async (req, res) => {
  let result = await Product.find({});
  console.log(result);
  //res.render("Homepage", { ListProduct: result });
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};
const getProductById = async (req, res) => {
  let id = req.params.id;
  let result = await Product.find({ userId: id });
  console.log(result);
  //res.render("Homepage", { ListUser: result });
  return res.status(200).json({
    data: result,
  });
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
module.exports = { getAllProduct };
