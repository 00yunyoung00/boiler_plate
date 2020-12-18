const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save', function( next ){

    var user = this;

    //password 암호화
    if(user.isModified('password')){ 
        //password변경 일어날 때만 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next()
            });
        });
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(planePassword, cb){
    // planspassword vs. 암호화된 비밀번호 
    // plandpassword를 암호화한 후 같은지 비교 
    bcrypt.compare(planePassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.genToken = function(cb){
    var user = this;
    // jwt이용하여 토큰 생성
    var token = jwt.sign(user._id.toHexString(),"secretToken")
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    console.log("in find by token")
    //user.findOne({"token":token}, function(err, user){
    //    if(err) return cb(err)
    //    cb(null, user)
    //})
    //토큰을 decode한다. 굳이 decode할 필요는 없을듯
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 id를 이용해 유저 찾고
        // clinet에서 가져온 token과 db에 보관된 토큰 일치 확인
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }