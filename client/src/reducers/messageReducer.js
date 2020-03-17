import { GET_MESSAGES } from '../constants'

export default function(state = [], action) {
    switch (action.type) {
        case GET_MESSAGES: return action.payload
        default: return state
    }
}