const { User } = require('../models/User');

let auth = (req, res, next) => {

  //인증처리

  // 클라이언트 쿠키에서 토큰을 가져온다. (cookie parser) 
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한 후 유저를 찾는다. 
  User.findByToken( token, ( err, user ) => {
    // 유저가 없으면 인증 fail
    if(err) throw err;
    // 유저가 있으면 인증 success
    if(!user) return res.json({ isAuth: false, error: true }) 
  })

  req.token = token;
  req.user = user;
  next();
}

module.exports = { auth };