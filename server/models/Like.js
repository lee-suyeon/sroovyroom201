const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'Visitors'
  }
}, {timestamps: true }); // 만든날짜, 업데이트 날짜 표시 

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }