import { LOAD_POSTS, LOAD_POSTDETAIL, WRITE_POST, DELETE_POST } from "../_actions/types"

export default function(state={}, action){
    switch(action.type){
        case LOAD_POSTS:
            return { ...state, posts:action.payload}
        case LOAD_POSTDETAIL:
            return { ...state, post:action.payload}
        case WRITE_POST:
            return { ...state, write:action.payload}
        case DELETE_POST:
            return { ...state, delete:action.payload}
        default:
            return state
    }
}