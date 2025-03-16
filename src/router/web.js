const express = require("express");
const {
  getAllUser,
  getUserById,
  postUpdateUser,
  postAddUser,
} = require("../controller/UserController");
const {
  getAllProduct,
  getProductById,
  postUpdateProduct,
  postAddProduct,
} = require("../controller/ProductController");
const {
  getAllOrder,
  getOrderById,
  postAddOrder,
} = require("../controller/OrderController");
const { getLogin, Login, getInit } = require("../controller/LoginController");
const router = express.Router();
//UserUser
router.get("/User", getAllUser);
router.get("/User/:id", getUserById);
router.post("/User/updateUser", postUpdateUser);
router.post("/User/addUser", postAddUser);

//product
router.get("/Product", getAllProduct);
router.get("/Product/:id", getProductById);
router.post("/Product/updateProduct", postUpdateProduct);
router.post("/Product/addProduct", postAddProduct);

//Order
router.get("/Order", getAllOrder);
router.get("/Order/:id", getOrderById);
router.post("/Order/addOrder", postAddOrder);

//Login
router.get("/", getInit);
router.get("/login", getLogin);
router.post("/login", Login);

module.exports = router;
