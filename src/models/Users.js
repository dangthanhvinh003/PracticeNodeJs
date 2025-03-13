const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
//shape data
const UserSchema = new mongoose.Schema({
  // Auto increment
  // install library npm install mongoose-sequence
  userId: { type: Number, unique: true }, // Số tự động tăng
  name: String,
  email: String,
  pass: String,
  city: String,
  role: String,
});
// Kích hoạt auto-increment cho userId
UserSchema.plugin(AutoIncrement, { inc_field: "userId" });
const User = mongoose.model("User", UserSchema);

module.exports = User;
