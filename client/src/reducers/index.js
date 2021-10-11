import { combineReducers } from 'redux';
import users from './usersReducer';
import messages from './messageReducer'
import rooms from './allRoomReducer'
import room from './roomReducer'
import joinedRooms from './joinedRoomsReducer'
import userName from './usernameReducer'
import privateMessages from './privateMessageReducer'

export default combineReducers({
  users,
  messages,
  rooms,
  room,
  joinedRooms,
  userName,
  privateMessages
});