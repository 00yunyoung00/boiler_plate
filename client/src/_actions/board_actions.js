import axios from 'axios';
import { LOAD_POSTS, LOAD_POSTDETAIL, WRITE_POST, DELETE_POST, WRITE_COMMENT } from "./types"

export function loadPosts(){
    const request = axios.get('/api/boards/')
        .then(response=>response.data)

    return{
        type:LOAD_POSTS,
        payload:request
    }
}

export function loadPostDetail(id){
    const request = axios.get(`/api/boards/${id}`)
        .then(response=>response.data)

    return{
        type:LOAD_POSTDETAIL,
        payload:request
    }
}

export function writeNewPost( body ){
    const request = axios.post('/api/boards/', body)
        .then(response=>response.data)

    return{
        type:WRITE_POST,
        payload:request
    }
}

export function deletePost(id){
    const request = axios.delete(`/api/boards/${id}`)
        .then(response=>response.data)
    
    return{
        type:DELETE_POST,
        payload:request
    }
}

export function writeComment( body ){
    const request = axios.post('/api/boards/comment/write', body)
        .then(response=>response.data)

    return{
        type:WRITE_COMMENT,
        payload:request
    }
}