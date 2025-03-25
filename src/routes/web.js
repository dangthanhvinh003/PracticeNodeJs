const express = require("express");
const {
  getAllUser,
  getUserById,
  postUpdateUser,
  postAddUser,
  getEditUser,
} = require("../controllers/UserController");
const {
  getAllProduct,
  getProductById,
  postUpdateProduct,
  postAddProduct,
  getAddProductPage,
  getEditProductPage,
  deleteProduct
} = require("../controllers/ProductController");
const { filterProducts } = require("../controllers/FilterController");
const { getCart, checkout, getOrderDetails, getOrders } = require("../controllers/OrderController");
const { getLogin, Login, getInit, register, getRegister } = require("../controllers/AuthController");
const router = express.Router();
const multer = require("multer");
const { vnpayReturn } = require("../controllers/VnPayController");
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
router.get("/Product/add-product", getAddProductPage);
router.post("/Product/add-product", postAddProduct);
router.get("/Product/edit/:id", getEditProductPage);
router.post("/Product/updateProduct", postUpdateProduct);
// router.post("/Product/deleteProduct", deleteProduct);
router.get("/Product", getAllProduct);
router.get("/Product/:id", getProductById);
router.get("/filter", filterProducts);

//Order
// router.post("/Order/addOrder", postAddOrder);
router.get("/Order/cart", getCart);
router.post("/Order/checkout", checkout)
router.get("/Order/vnpay-return", vnpayReturn)
router.get("/Order/:id", getOrderDetails);

router.get("/orders", getOrders);

// Auth
router.get("/", getInit);
router.get("/login", getLogin);
router.post("/login", Login);
router.get("/register", getRegister);
router.post("/register", register);

// Log out
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid"); // Xóa cookie session
    return res.redirect("/"); // Chuyển hướng về trang login
  });
});



module.exports = router;
