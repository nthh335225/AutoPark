// src/models/userModel.js
import mongoose from 'mongoose';

// Định nghĩa schema cho user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  token: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  },
  bonusPoint: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Tạo model cho user
const User = mongoose.model('User', userSchema);

export default User;
