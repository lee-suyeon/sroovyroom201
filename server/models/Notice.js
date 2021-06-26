const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = mongoose.Schema({
  writer : { // 작성자
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: { // 공지사항 제목
    type: String,
    maxlength: 50,
  },
  content: { // 공지사항 내용
    type: String,
    maxlength: 1000,
  }
}, {timestamps: true }); // 만든날짜, 업데이트 날짜 표시 

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = { Notice }