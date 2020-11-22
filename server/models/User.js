const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt length
const jwt = require('jsonwebtoken');

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
    maxlength: 100
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

// 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, callback) {
  // plainPassword을 암호화해서 기존에 암호화된 비밀번호와 맞는지 체크
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return callback(err);
    callback(null, isMatch)
  })
}

// 토큰 생성
userSchema.methods.generateToken = function (callback) {
  const user = this;

  // jsonwebtoken을 이용해서 토큰 생성
  let token = jwt.sign(user._id.toHexString(), 'sroovyroom' )
  
  user.token = token;
  user.save(function (err, user) {
    if(err) return callback(err)
    callback(null, user)
  });
}

// 토큰 찾기
userSchema.statics.findByToken = function ( token, callback ) {
  const user = this;

  // 토큰 복호화 decode
  jwt.verify(token, 'sroovyroom', (err, decoded) => {
    // userId로 유저를 찾은 후 
    // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인

    user.findOne({ "_id": decoded, "token": token }, (err, user) => {
      if(err) return callback(err);
      callback(null, user);
    })
  })
}


const User = mongoose.model('User', userSchema);

module.exports = { User }