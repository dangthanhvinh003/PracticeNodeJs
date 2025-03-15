const User = require("../models/Users");

const getAllUser = async (req, res) => {
  let result = await User.find({});
  console.log(result);
  //res.render("Homepage", { ListUser: result });
  return res.status(200).json({
    data: result,
  });
};

const getUserById = async (req, res) => {
  let id = req.params.id;
  let result = await User.find({ userId: id });
  // console.log("check Session: " + JSON.stringify(req.session.user, null, 2));
  // console.log(
  //   "check Session: " + JSON.stringify(req.session.user.userId, null, 2)
  // );
  // console.log(
  //   "check Session: " + JSON.stringify(req.session.user.name, null, 2)
  // );
  // console.log(
  //   "check Session: " + JSON.stringify(req.session.user.email, null, 2)
  // );
  // console.log(
  //   "check Session: " + JSON.stringify(req.session.user.pass, null, 2)
  // );
  console.log(result);
  //res.render("Homepage", { ListUser: result });
  return res.status(200).json({
    data: result,
  });
};

const postUpdateUser = async (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  let img = req.body.img;
  //const { id, name, email, img } = req.body;
  let result = await User.updateOne(
    { userId: id },
    { name: name, email: email, img: img }
  );
  console.log(result);

  return res.status(200).json({
    data: result,
  });
};

const postAddUser = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let pass = req.body.pass;
  let city = req.body.city;
  //const { id, name, email, img } = req.body;
  let user = await User.create({
    name: name,
    email: email,
    pass: pass,
    city: city,
  });

  console.log(user);

  return res.status(200).json({
    data: user,
  });
};

module.exports = { getAllUser, getUserById, postUpdateUser, postAddUser };
