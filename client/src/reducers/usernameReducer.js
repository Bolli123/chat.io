import { SET_USERNAME, GET_USERNAME } from '../constants'


export default function(state = "", action) {
    switch (action.type) {
        case SET_USERNAME: return action.payload
        case GET_USERNAME: return state
        default: return state
    }
}