const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt length

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1 
  },
  password: {
    type: String,
    maxlength: 50
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
    type: Number
  }
})

// user모델에 user정보를 전달하기 전에 실행할 함수
userSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) { // 비밀번호를 변경 할 때만
    // salt를 이용해 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) { 
      if (err) return next(err)
  
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err)
        user.password = hash; // 해쉬된 비밀번호로 변경
        next();
      });
    });
  } else {
    next();
  }
})

const User = mongoose.model('User', userSchema);

module.exports = { User }