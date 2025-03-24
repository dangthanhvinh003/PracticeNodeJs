const User = require("../models/Users"); // Import model User của bạn

// Hiển thị trang Sign Up
const getSignUp = (req, res) => {
  res.render("Signup", { error: null }); // Render trang signup.ejs và truyền error nếu có
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra định dạng email
    return regex.test(email);
};

// Xử lý đăng ký
const postSignUp = async (req, res) => {
  const { fullname, email, password, confirmPassword, city } = req.body;

  // Kiểm tra mật khẩu và xác nhận mật khẩu
  if (password !== confirmPassword) {
    return res.render("Signup", { error: "Mật khẩu không khớp!" });
  }

  try {

    if (!validateEmail(email)) {
        return res.render("signup", { error: "Email không hợp lệ!" });
      }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("Signup", { error: "Email đã được sử dụng!" });
    }

    // Tạo người dùng mới với các trường từ UserModel của bạn
    const newUser = new User({
      name: fullname,
      email,
      pass: password, // Lưu mật khẩu đã mã hóa
      city,
      role: "user", // Mặc định role là "user"
      img: "", // Bạn có thể thêm logic để upload ảnh nếu cần
    });

    // Lưu người dùng vào database
    await newUser.save();

    // Chuyển hướng về trang login sau khi đăng ký thành công
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("Signup", { error: "Đã xảy ra lỗi khi đăng ký!" });
  }
};

module.exports = {
  getSignUp,
  postSignUp,
};