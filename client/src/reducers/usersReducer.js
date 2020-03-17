import { SET_USERS } from '../constants'


export default function(state = [], action) {
    switch (action.type) {
        case SET_USERS: return action.payload
        default: return state
    }
}