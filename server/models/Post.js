const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    author:{
        type:String
    },
    content:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
    
})

const PostSchema = mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    content:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    comments:[CommentSchema],
    count:{
        type:Number
    }
})

const Post = mongoose.model('Post', PostSchema)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = { Post, Comment }