import express from 'express';
import { getAllUser, getUserById, postUpdateUser, postAddUser, getEditUser } from "../controllers/UserController.js";
import { getAllProduct, getProductById, postUpdateProduct, postAddProduct } from "../controllers/ProductController.js";
import { getCart, postAddOrder, checkout } from "../controllers/OrderController.js";
import { getLogin, Login, getInit, register, getRegister } from "../controllers/AuthController.js";
import multer, { memoryStorage } from "multer";


const router = express.Router();

// Cấu hình Multer để upload file lên bộ nhớ
const storage = memoryStorage();
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
router.post("/Order/checkout", checkout);

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

export default router;
