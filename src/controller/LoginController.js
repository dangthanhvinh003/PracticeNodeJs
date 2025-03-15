const User = require("../models/Users");

const getLogin = (req, res) => {
  res.render("Login", { error: null });
};

const Login = async (req, res) => {
  const { email, pass } = req.body;
  let result = await User.findOne({ email, pass });
  console.log("Check rêult : " + result);
  if (result != null) {
    let List = await User.find({});
    res.render("Homepage", { ListUser: List, User: result });
  } else {
    let err = "Tài Khoản hoặc mật khẩu không đúng";
    res.render("Login", { error: err });
  }
};
module.exports = {
  getLogin,
  Login,
};
