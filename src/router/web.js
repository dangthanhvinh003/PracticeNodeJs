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

module.exports = router;
