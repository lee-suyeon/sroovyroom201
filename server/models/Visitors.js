const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorsSchema = mongoose.Schema({
  writer : { // 댓글 작성한 사람
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  privacy: {
    type: Number,
  },
  content: { // 댓글 내용
    type: String,
    maxlength: 300,
  }
}, {timestamps: true }); // 만든날짜, 업데이트 날짜 표시 

const Visitors = mongoose.model('Visitors', visitorsSchema);

module.exports = { Visitors }