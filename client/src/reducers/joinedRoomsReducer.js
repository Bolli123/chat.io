import { SET_JOINED_ROOMS, DELETE_JOINED_ROOM } from '../constants'

export default function(state = ["lobby"], action) {
    switch (action.type) {
        case SET_JOINED_ROOMS:
            state.push(action.payload)
            return state
        case DELETE_JOINED_ROOM:
            const index = state.indexOf(action.payload);
            if (index > -1) {
                state.splice(index, 1);
            }
            return state
        default: return state
    }
}