const User = require("../models/Users");
const Product = require("../models/Products");
const getLogin = (req, res) => {
  res.render("Login", { error: null });
};

const Login = async (req, res) => {
  const { email, pass } = req.body;
  let result = await User.findOne({ email, pass });
  //console.log("Check rêult : " + result);
  if (result != null) {
    req.session.user = result;
    let List = await Product.find({});
    res.render("Homepage", { ListProduct: List, User: result });
  } else {
    let err = "Tài Khoản hoặc mật khẩu không đúng";
    res.render("Login", { error: err });
  }
};

const getInit = async (req, res) => {
  let List = await Product.find({});
  res.render("Homepage", { ListProduct: List, User: req.session.user || null });
};
module.exports = {
  getLogin,
  Login,
  getInit,
};
