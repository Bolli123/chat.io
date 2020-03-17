import { SET_ROOM, SET_JOINED_ROOMS, GET_ROOMS, DELETE_JOINED_ROOM } from '../constants'
import { socket } from '../services/socketService';


export const getAllRooms = () => async dispatch => {
    socket.emit('rooms')
    socket.on('roomlist', rooms => {
        dispatch(getAllRoomsSuccess(rooms))
    })
}

export const setCurrentRoom = (currRoom) => async dispatch => {
    dispatch(setCurrentRoomSuccess(currRoom))
}


export const setJoinedRooms = (currRoom) => async dispatch => {
    dispatch(setJoinedRoomsSuccess(currRoom))
}

export const deleteJoinedRoom = (room) => async dispatch => {
    dispatch(deleteJoinedRoomSuccess(room))
}

const deleteJoinedRoomSuccess = room => ({
    type: DELETE_JOINED_ROOM,
    payload: room
})

const setJoinedRoomsSuccess = room => ({
    type: SET_JOINED_ROOMS,
    payload: room
})

const setCurrentRoomSuccess = room => ({
    type: SET_ROOM,
    payload: room
})

const getAllRoomsSuccess = rooms => ({
    type: GET_ROOMS,
    payload: rooms
})
