import { LOAD_POSTS, LOAD_POSTDETAIL } from "../_actions/types"

export default function(state={}, action){
    switch(action.type){
        case LOAD_POSTS:
            return { ...state, posts:action.payload}
        case LOAD_POSTDETAIL:
            return { ...state, post:action.payload}
        default:
            return state
    }
}