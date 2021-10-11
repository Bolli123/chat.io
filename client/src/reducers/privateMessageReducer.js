import { SET_PRIVATE_MESSAGES } from '../constants'

export default function(state = [], action) {
    switch (action.type) {
        case SET_PRIVATE_MESSAGES:
            state.push(action.payload)
            return state
        default: return state
    }
}