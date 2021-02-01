import axios from 'axios';
import { LOAD_POSTS, LOAD_POSTDETAIL } from "./types"

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