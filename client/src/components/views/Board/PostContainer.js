import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { loadPostDetail, deletePost } from '../../../_actions/board_actions'
import PostDetail from './PostDetail';

function PostContainer ({ history, match }) {
    const postId = match.params.id
    const dispatch = useDispatch()

    const post = useSelector(state => state.board.post)
    const userId = localStorage.getItem("userId")

    useEffect(()=>{
        dispatch(loadPostDetail(postId)).then(response=>{
            if(response.payload.getPostSuccess){
                console.log(response)
            }else{
                alert('error')
            }
        })
    },[dispatch, postId])

    const onDeletePost = () =>{
        console.log(postId)
        dispatch(deletePost(postId)).then(response=>{
            if(response.payload.deleteSuccess){
                history.push('/board')
            }else{
                alert('error')
            }
        })
    }

    if (!post) return <div>로딩중...</div>;
    return <PostDetail post={post.post} user={userId} onDeletePost={onDeletePost}/>;

}

export default withRouter(PostContainer)
