const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/key');

const { Booking } = require('../models/Booking');

router.post('/', (req, res) => {

  const booking = new Booking(req.body)

  booking.save(err => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
  
});

router.post('/booking', (req, res) => {
  
  let data = req.body;
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
        <li>날짜 : <strong>${data.checkIn} ~ ${data.checkOut} (${data.nights + 1}일)</strong></li>
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
        console.log(error);
        return;
    }
  });
})

module.exports = router;