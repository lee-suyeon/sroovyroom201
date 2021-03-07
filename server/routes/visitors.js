const express = require('express');
const router = express.Router();

const { Visitors } = require('../models/Visitors');

// 방명록 작성
router.post('/', (req, res) => {

  const visitors = new Visitors(req.body)

  visitors.save(err => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
  
});

// 방명록 불러오기
router.post('/messages', (req, res) => {

  // visitors의 모든 정보 가져오기. 
  Visitors.find()
    .populate("writer")
    .exec((err, messages ) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, messages })
    })
});

module.exports = router;