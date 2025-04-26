const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "https://ui-avatars.com/api/?name=Use"
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
