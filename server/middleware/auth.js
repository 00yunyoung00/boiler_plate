const { User } = require("../models/User");

let auth = (req, res, next) =>{
    //인증처리 하는 곳

    // clinet 쿠키에서 토큰 가져옴
    let token = req.cookies.x_auth;
    console.log(token)
    console.log(User)
    // decode token 토큰복호화 후 유저 찾음
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true})

        req.token=token;
        req.user=user;
        next()
    })

    // 유저 있으면 인증 okay
    // 없으면 no
}

module.exports = { auth };