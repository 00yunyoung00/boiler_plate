import { LOAD_POSTS } from "../_actions/types"

export default function(state={}, action){
    switch(action.type){
        case LOAD_POSTS:
            return { ...state, posts:action.payload}
        default:
            return state
    }
}