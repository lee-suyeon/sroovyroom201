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

module.exports = router;