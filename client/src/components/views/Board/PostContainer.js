import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadPostDetail } from '../../../_actions/board_actions'
import PostDetail from './PostDetail';

function PostContainer({ match }) {
    console.log(match)
    const postId = match.params.id

    const dispatch = useDispatch()

    const post = useSelector(state => state.board.post)

    useEffect(()=>{
        dispatch(loadPostDetail(postId)).then(response=>{
            if(response.payload.getPostSuccess){
                console.log(response)
            }else{
                alert('error')
            }
        })
    },[dispatch, postId])

    if (!post) return <div>로딩중...</div>;
    return <PostDetail post={post.post} />;

}

export default PostContainer
