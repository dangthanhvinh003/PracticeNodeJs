const express = require("express");
const {
  getAllUser,
  getUserById,
  postUpdateUser,
  postAddUser,
} = require("../controller/UserController");
// const {
//   getHompage,
//   getAddUserPage,
//   getEditUser,
// } = require("../controller/homeController");
// const {
//   postAddUser,
//   postEditUser,
//   getDeleteUser,
// } = require("../controller/UserController");

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/updateUser", postUpdateUser);
router.post("/addUser", postAddUser);

//Uset
// router.get("/getAddUser", getAddUserPage);
// router.post("/CreateNewUser", postAddUser);
// router.get("/editUser/:id", getEditUser);
// router.post("/editUser", postEditUser);
// router.get("/deleteUser/:id", getDeleteUser);
module.exports = router;
