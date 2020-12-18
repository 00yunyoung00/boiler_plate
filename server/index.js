const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const config = require('./config/key')
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB connected...'))
  .catch(err=>console.log(err))


app.get('/api/hello', (req, res)=>res.send('Hello World!'))

app.post('/register', (req, res)=>{
  // 회원가입 시 필요한 정보를 client에서 가져오면
  // 그것들을 db에 넣어줌

  const user = new User(req.body)

  user.save((err, doc)=>{
    if (err) return res.json({success:false, err})
    return res.status(200).json({success:true})
  })
})

app.post('/login', (req, res)=>{

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



app.get('/api/users/auth', auth, (req, res)=>{
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


app.get('/api/users/logout', auth, (req, res)=>{
  User.findOneAndUpdate({ _id: req.user._id},
    { token:""}
    , (err, user)=>{
      if(err) return res.json({ success:false, err});
      return res.status(200).send({
        success:true
      })
    })
})


app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))