import { GET_MESSAGES, SET_PRIVATE_MESSAGES } from '../constants'

export const getAllMessages = (messages) => async dispatch => {
    dispatch(getAllMessagesSuccess(messages))
}

export const setPrivateMessages = (message) => async dispatch => {
    dispatch(setPrivateMessageSuccess(message))
}

const setPrivateMessageSuccess = message => ({
    type: SET_PRIVATE_MESSAGES,
    payload: message
})


const getAllMessagesSuccess = messages => ({
    type: GET_MESSAGES,
    payload: messages
})
