const User = require("../models/Users");

const getAllUser = async (req, res) => {
  let result = await User.find({});
  console.log(result);
  res.render("Homepage", { ListUser: result });
  // return res.status(200).json({
  //   data: result,
  // });
};

module.exports = { getAllUser };
