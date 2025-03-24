const User = require("../models/Users");
const Product = require("../models/Product");
const getLogin = (req, res) => {
  res.render("Login", { error: null });
};

const Login = async (req, res) => {
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

const getInit = async (req, res) => {
  let List = await Product.find({});
  res.render("Homepage", { ListProduct: List, User: req.session.user || null });
};

const getRegister = (req, res) => {
  res.render("Signup", { error: null, message: null });
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const register = async (req, res) => {
  const { fullname, email, password, confirmPassword, city } = req.body;

  if (password !== confirmPassword) {
    return res.render("Signup", { error: "Mật khẩu không khớp!" });
  }
 
  try {

    if (!validateEmail(email)) {
        return res.render("Signup", { error: "Email không hợp lệ!" });
      }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("Signup", { error: "Email đã được sử dụng!" });
    }

    // Tạo người dùng mới với các trường từ UserModel của bạn
    const newUser = new User({
      name: fullname,
      email,
      pass: password,
      city,
      role: "user",
      img: "",
    });

    await newUser.save();

    res.render("Login", { error: null, message: "Registration successful. Please log in." });
  } catch (err) {
    res.render("Signup", { error: "Registration failed. Please try again." + err });
  }
};

module.exports = {
  getLogin,
  Login,
  getInit,
  register,
  getRegister
};
