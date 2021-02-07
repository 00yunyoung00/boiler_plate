const express = require('express');
const router = express.Router();
const { Post, Comment } = require("../models/Post");

router.get('/', (req, res)=>{
    //모든 게시글
    Post.find({}, (err, posts)=>{
        if(err){
            return res.json({success:false, err})
        }
        return res.status(200).json({success:true, posts:posts})
    })
})

router.post('/', (req, res)=>{
    //게시글 작성
    const post = new Post(req.body)

    post.save((err, doc)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({success:true})
    })
})

router.get('/:id', (req, res)=>{
    //게시글 조회
    Post.findOne({_id:req.params.id}, (err, post)=>{
        if(!post) return res.json({
                getPostSuccess:false,
                message:"no post"
            })
        post.count++
        post.save()
        return res.status(200).json({getPostSuccess:true, post:post})
    })
})

router.put('/:id', (req, res)=>{
    //게시글 수정
})

router.delete('/:id', (req, res)=>{
    //게시글 삭제
    Post.findOneAndDelete({_id:req.params.id}, (err)=>{
        if(err){
            return res.json({
                deleteSuccess:false,
                err
            })
        }
        return res.status(200).json({deleteSuccess:true})
        
    })
})

router.post('/comment/write', (req, res)=>{
    //댓글 입력
    let comment = new Comment()
    comment.content = req.body.content
    comment.author = req.body.author
    console.log(comment)
    Post.findOneAndUpdate({_id:req.body.id},{ $push: { comments : comment } }, (err)=>{
        if(err){
            return res.json({addCommentSuccess:false, err})
        }
        return res.status(200).json({addCommentSuccess:true})
    })
})

module.exports = router;