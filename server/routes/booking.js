const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const moment = require("moment");
const config = require('../config/key');

const { Booking } = require('../models/Booking');

router.get('/', (req, res) => {
  let today = moment().set({'hour': 0, 'minute': 0, 'second': 0});

  Booking.find({ 'checkIn': { '$gte' : today }})
    .exec((err, date ) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, date })
    })
})

router.post('/', (req, res) => {

  const booking = new Booking(req.body)

  booking.save(err => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
  
});

router.post('/booking', (req, res) => {
  
  let data = req.body;
  let checkIn = moment(data.checkIn).format("YYYY-MM-DD");
  let checkOut = moment(data.checkOut).format("YYYY-MM-DD");

  let transporter = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 465,
    secure: false,
    auth: {
      user: config.nodemailerUser,
      pass: config.nodemailerPass,
    },
  })

  let mailOptions = {
    from: `SROOVYROOM201 <${config.nodemailerUser}>`,
    to: data.email ,
    subject: 'SROOVYROOM201 예약확인메일입니다.',
    text: data.booker,
    html: `<h3>예약 확인 메일입니다.</h3>
      <ul>
        <li>날짜 : <strong>${checkIn} ~ ${checkOut} (${data.nights + 1}일)</strong></li>
        <li>방문시간 : <strong>${data.visitTime}</strong></li>
        <li>인원수 : <strong>${data.headCount}명</strong></li>
        <li>메뉴 : <strong>${data.dinnerMenu}</strong></li>
      </ul>
      <br />
      <p>스루비룸에서 만나요~~~</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('err : ', info)
      return res.status(400).json({ success: false, error })
    } else{
      return res.status(200).json({ success: true })
    };
  });
})

module.exports = router;