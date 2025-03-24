const User = require("../models/Users");
const Product = require("../models/Product");
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

const getRegister = (req, res) => {
  res.render("Register", { error: null, message: null });
};

const register = async (req, res) => {
  const { email, pass } = req.body;
  try {
    let newUser = new User({ email, pass });
    await newUser.save();
    res.render("Login", { error: null, message: "Registration successful. Please log in." });
  } catch (err) {
    res.render("Register", { error: "Registration failed. Please try again." });
  }
};

module.exports = {
  getLogin,
  Login,
  getInit,
  register,
  getRegister
};
