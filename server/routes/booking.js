const express = require('express');
const router = express.Router();

const { Booking } = require('../models/Booking');

router.post('/', (req, res) => {

  const booking = new Booking(req.body)

  booking.save(err => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
  
});

module.exports = router;