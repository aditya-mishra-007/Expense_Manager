const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
}, { timestamps: true });

// ✅ MODERN ASYNC APPROACH: No 'next' parameter needed
UserSchema.pre('save', async function () {
  // 1. Only run this if password was actually modified
  if (!this.isModified('password')) {
    return; // Just return to continue
  }

  try {
    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // In async hooks, simply finishing the function acts as 'next()'
  } catch (error) {
    // If there is an error, throw it to be caught by your route's catch block
    throw error;
  }
});

module.exports = mongoose.model('User', UserSchema);