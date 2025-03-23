const express = require("express");
const {
  getAllUser,
  getUserById,
  postUpdateUser,
  postAddUser,
  getEditUser,
} = require("../controller/UserController");
const {
  getAllProduct,
  getProductById,
  postUpdateProduct,
  postAddProduct,
} = require("../controller/ProductController");
const { getCart, postAddOrder } = require("../controller/OrderController");
const { getLogin, Login, getInit } = require("../controller/LoginController");
const router = express.Router();
const multer = require("multer");
// Cấu hình Multer để upload file lên bộ nhớ
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//UserUser
router.get("/User", getAllUser);
router.get("/User/:id", getUserById);
router.post("/User/updateUser", upload.single("img"), postUpdateUser);
router.post("/User/addUser", postAddUser);
router.get("/editUser", getEditUser);

//product
router.get("/Product", getAllProduct);
router.get("/Product/:id", getProductById);
router.post("/Product/updateProduct", postUpdateProduct);
router.post("/Product/addProduct", postAddProduct);

//Order
router.post("/Order/addOrder", postAddOrder);
router.get("/Order/cart", getCart);

//Login
router.get("/", getInit);
router.get("/login", getLogin);
router.post("/login", Login);
//log out
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid"); // Xóa cookie session
    return res.redirect("/"); // Chuyển hướng về trang login
  });
});
module.exports = router;
