import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  city: { type: String },
  role: { type: String },
  img: { type: String },
});

const User = model("User", UserSchema);

export default User;