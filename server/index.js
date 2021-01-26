const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const config = require('./config/key')
const cookieParser = require('cookie-parser')
//const { auth } = require('./middleware/auth')

//application/x-www-form url-encoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());

app.use(cookieParser());

//connect mongodb 
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB connected...'))
  .catch(err=>console.log(err))

app.use('/api/users', require('./routes/users'));
app.use('/api/boards', require('./routes/boards'));

app.get('/api/hello', (req, res)=>res.send('Hello World!'))

app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))