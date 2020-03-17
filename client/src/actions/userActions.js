import { socket } from '../services/socketService';
import { GET_USERS, SET_USERS, SET_USERNAME } from '../constants'

export const getAllUsers = () => async dispatch => {
    socket.emit('users')
    socket.on('userlist', userList => {
        dispatch(getAllUsersSuccess(userList))
    })
}

export const setUserName = (username) => async dispatch => {
    dispatch(setUserNameSuccess(username))
}

export const setUsers = (users) => async dispatch => {
    dispatch(setUsersSuccess(Object.keys(users)))
}

const setUserNameSuccess = username => ({
    type: SET_USERNAME,
    payload: username
})

const getAllUsersSuccess = users => ({
    type: GET_USERS,
    payload: users
})

const setUsersSuccess = users => ({
    type: SET_USERS,
    payload: users
})
