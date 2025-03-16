const User = require("../models/Users");
const { uploadToCloudinary } = require("./CloudinaryController"); // Import Cloudinary config
const multer = require("multer");
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
  let id = req.session.user.userId;
  let name = req.body.name;
  let email = req.body.email;
  let img = req.session.user.img; // Giữ ảnh cũ nếu không có file mới
  console.log("Update id : " + id);
  console.log("Update name : " + name);
  console.log("Update email : " + email);
  console.log("Update imgmg : " + img);
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "users");
    img = result.secure_url; // URL ảnh từ Cloudinary
    console.log("ING LINK : " + img);
  }
  //const { id, name, email, img } = req.body;
  let result = await User.updateOne(
    { userId: id },
    { name: name, email: email, img: img }
  );
  console.log(result);
  req.session.user = await User.findOne({ userId: id });
  res.redirect("/");
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

const getEditUser = async (req, res) => {
  let id = req.session.user.userId;
  console.log(id);
  let find = await User.findOne({ userId: id });
  res.render("User/UpdateProfile", { UserProfile: find });
};

module.exports = {
  getAllUser,
  getUserById,
  postUpdateUser,
  postAddUser,
  getEditUser,
};
