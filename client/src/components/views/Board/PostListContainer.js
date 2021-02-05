import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {loadPosts} from '../../../_actions/board_actions'
import PostList from './PostList'

function PostListContainer(props) {

    const dispatch = useDispatch()
    console.log(props)

    const posts = useSelector(state => state.board.posts)

    useEffect(()=>{
        dispatch(loadPosts()).then(response=>{
            if(response.payload.success){
                console.log(response)
            }else{
                alert('error')
            }
        })
    },[dispatch])

    if (!posts) return <div>로딩중...</div>;
    return <PostList posts={posts} />;

}

export default PostListContainer
