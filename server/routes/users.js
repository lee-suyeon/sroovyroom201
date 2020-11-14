const express = require('express');
const router = express.Router();

const { User } = require('../models/User');

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

module.exports = router;