import { GET_MESSAGES } from '../constants'

export const getAllMessages = (messages) => async dispatch => {
    dispatch(getAllMessagesSuccess(messages))
}


const getAllMessagesSuccess = messages => ({
    type: GET_MESSAGES,
    payload: messages
})
