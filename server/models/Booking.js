const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = mongoose.Schema({
  user : { // 작성자
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  booker: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  nights: {
    type: Number,
    default: 0,
  },
  visitTime: {
    type: String,
  },
  headCount: {
    type: Number,
  },
  menu: {
    type: String,
  },
  InfoAgreement: {
    type: Boolean,
  }
}, {timestamps: true }); // 만든날짜, 업데이트 날짜 표시 

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = { Booking }