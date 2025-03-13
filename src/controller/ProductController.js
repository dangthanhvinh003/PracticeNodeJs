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

module.exports = { getAllProduct };
