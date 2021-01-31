import axios from 'axios';
import { LOAD_POSTS } from "./types"

export function loadPosts(){
    const request = axios.get('/api/boards/')
        .then(response=>response.data)

    return{
        type:LOAD_POSTS,
        payload:request
    }
}