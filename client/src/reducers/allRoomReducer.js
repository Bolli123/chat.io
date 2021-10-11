import { GET_ROOMS } from '../constants'

export default function(state = {}, action) {
    switch (action.type) {
        case GET_ROOMS: return action.payload
        default: return state
    }
}