const Product = require("../models/Products");

const getAllProduct = async (req, res) => {
  let result = await Product.find({});
  console.log(result);
  res.render("Homepage", { ListProduct: result });
};

module.exports = { getAllProduct };
