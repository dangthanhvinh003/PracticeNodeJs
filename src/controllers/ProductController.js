const Product = require("../models/Product");

const getAllProduct = async (req, res) => {
  let result = await Product.find({});
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};
const getProductById = async (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send("Invalid product ID");
  }
  let result = await Product.findOne({ productId: id });
  if (!result) {
    return res.status(404).send("Product not found");
  }
  res.render("Product/DetailProduct", { productDetail: result });
};

const postUpdateProduct = async (req, res) => {
  try {
    const { id, name, img, type, price, quantity } = req.body;

    // Validate input
    if (!id || !name || !price) {
      return res.status(400).json({ 
        error: "Missing required fields" 
      });
    }

    const result = await Product.updateOne(
      { productId: Number(id) },
      { 
        name, 
        img: img || '/default-product.jpg',
        type: type || 'general',
        price: parseFloat(price),
        quantity: parseInt(quantity) || 0 
      }
    );

    // Redirect to homepage after successful update
    return res.redirect("/");
    
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
};

const postAddProduct = async (req, res) => {
  try {
    const { name, img, type, price, quantity } = req.body;

    if (!name || !price) {
      return res.status(400).render("Product/addProduct", {
        error: "Product name and price are required",
        User: req.session.User
      });
    }

    await Product.create({
      name,
      img: img || '/default-product.jpg',
      type: type || 'general',
      price: parseFloat(price),
      quantity: parseInt(quantity) || 0
    });

    return res.redirect("/"); // Chuyển hướng về trang chủ
    
  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).render("Product/addProduct", {
      error: "Internal server error",
      User: req.session.User
    });
  }
};

const getAddProductPage = async (req, res) => {
  res.render("Product/addProduct", { User: req.session.User });
};

const getEditProductPage = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).send("Invalid product ID");
    }

    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("Product/editProduct", { 
      product,
      User: req.session.User 
    });
  } catch (error) {
    console.error("Error getting edit product page:", error);
    res.status(500).send("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = Number(req.body.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const result = await Product.deleteOne({ productId: productId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.redirect("/");
    
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  postAddProduct,
  postUpdateProduct,
  getAddProductPage,
  getEditProductPage,
  deleteProduct
};
