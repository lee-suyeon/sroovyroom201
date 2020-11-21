const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

// auth 인증
router.get('/auth', auth, (req, res) => {
  // 유저 정보를 제공
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    image: req.user.image,
  })
})

// 회원가입
router.post('/register', (req, res) => {

  // 회원 가입 정보 →bodyparser → DB에 저장
  const user = new User(req.body);

  // doc = userInfo
  user.save(( err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    });
  });
});

// 로그인
router.post('/login', (req, res) => {

  // 요청한 id를 DB에서 찾는다. 
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: '가입하지 않은 아이디입니다.'
      })
    }
    // 요청한 id를 데이터 베이스에 있다면 비밀번호를 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });

      // Token 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장한다. 
        res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      });
    })
  })
});

module.exports = router;