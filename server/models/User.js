const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    maxlength: 20,
  },
  role: { // host = 0, friend = 1, guest = 9
    type: Number,
    default: 0 
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number,
  }
})

const User = mongoose.model('User', userSchema);

module.exports = { User }