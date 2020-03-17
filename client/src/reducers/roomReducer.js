import { SET_ROOM } from '../constants'

export default function(state = 'lobby', action) {
    switch (action.type) {
        case SET_ROOM:
            return action.payload
        default: 
            return state
    }
}