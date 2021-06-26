const express = require('express');
const router = express.Router();

const { Notice } = require('../models/Notice');

// 공지사항 작성
router.post('/', (req, res) => {

  const notice = new Notice(req.body)

  notice.save(err => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
  
});

// 공지사항 불러오기
router.post('/notice', (req, res) => {

  // 공지사항 모든 정보 가져오기. 
  Notice.find()
    .populate("writer")
    .exec((err, notice ) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, notice })
    })
});

module.exports = router;