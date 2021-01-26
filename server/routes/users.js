const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

router.post('/register', (req, res)=>{
    // 회원가입 시 필요한 정보를 client에서 가져오면
    // 그것들을 db에 넣어줌
  
    const user = new User(req.body)
  
    user.save((err, doc)=>{
      if (err) return res.json({success:false, err})
      return res.status(200).json({success:true})
    })
  })
  
router.post('/login', (req, res)=>{
  
    // 요청된 이메일을 db에서 찾자
    User.findOne({ email:req.body.email }, (err, user)=>{
      if(!user){
        return res.json({
          loginSuccess:false,
          message:"no user"
        })
      }
  
      // 있다면, 비밀번호 확인
      user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch) return res.json({
          loginSuccess:false,
          message:"wrong passwd"
        })
  
        // 토큰생성
        user.genToken((err, user)=>{
          if(err) return res.status(400).send(err);
  
          //token을 저장하자. 쿠키, 로컬스토리지, 세션 등
          res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess:true, userId: user._id})
        })
  
      })
  
    })
  
  })
  
  
  
router.get('/auth', auth, (req, res)=>{
    // 여기 들어왔다는 것은 미들웨어 통과 했다는겨
    // authentification 이 true
    res.status(200).json({
      _id:req.user._id,
      isAdmin:req.user.role===0? false:true,
      isAuth:true,
      email:req.user.email,
      name:req.user.name,
      lastname:req.user.lastname,
      role:req.user.role,
      image:req.user.image
    })
  })
  
  
router.get('/logout', auth, (req, res)=>{
    User.findOneAndUpdate({ _id: req.user._id},
      { token:""}
      , (err, user)=>{
        if(err) return res.json({ success:false, err});
        return res.status(200).send({
          success:true
        })
      })
  })
  

module.exports = router;