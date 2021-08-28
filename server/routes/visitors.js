const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const { Visitors } = require('../models/Visitors');

// 방명록 작성
router.post('/saveVisitors', (req, res) => {

  const visitors = new Visitors(req.body)

  visitors.save(err => {
    if(err) return res.status(400).json({ success: false, err })
    
    Visitors.find({ '_id': visitors._id })
      .populate('writer') // 모든 writer의 정보를 가져옴
      .exec( (err, result) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true, result })
      })
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