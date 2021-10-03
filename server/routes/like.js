const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like');

// 방명록 불러오기
router.post('/getLikes', (req, res) => {
  // visitors의 모든 정보 가져오기. 
  Like.find({ messageId: req.body.messageId })
    .exec((err, likes) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, likes })
    })
});

router.post('/upLike', (req, res) => {
  // save Like collection 
  const like = new Like({ 
    messageId: req.body.messageId,
    userId: req.body.userId
  })

  like.save((err, result) => {
    if(err) return res.status(400).json({ success: false, err })
    res.status(200).json({ success: true, result })
  })
});

router.post('/unLike', (req, res) => {
  Like.findOneAndDelete({ userId: req.body.userId, messageId: req.body.messageId })
    .exec((err, result) => {
      if(err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, result })
    })
});

module.exports = router;