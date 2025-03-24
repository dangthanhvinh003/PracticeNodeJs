import User from "../models/Users.js";
import Product from "../models/Product.js";

export const getLogin = (req, res) => {
  res.render("Login", { error: null });
};

export const Login = async (req, res) => {
  const { email, pass } = req.body;
  let result = await User.findOne({ email, pass });
  if (result != null) {
    req.session.user = result;
    let List = await Product.find({});
    res.render("Homepage", { ListProduct: List, User: result });
  } else {
    let err = "Tài Khoản hoặc mật khẩu không đúng";
    res.render("Login", { error: err });
  }
};

export const getInit = async (req, res) => {
  let List = await Product.find({});
  res.render("Homepage", { ListProduct: List, User: req.session.user || null });
};

export const getRegister = (req, res) => {
  res.render("Register", { error: null, message: null });
};

export const register = async (req, res) => {
  const { email, pass } = req.body;
  try {
    let newUser = new User({ email, pass });
    await newUser.save();
    res.render("Login", { error: null, message: "Registration successful. Please log in." });
  } catch (err) {
    console.log(err.toString());
    res.render("Register", { error: "Registration failed. Please try again.", message: null });
  }
};

