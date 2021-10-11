import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow'
import { connect } from 'react-redux'
import { socket } from '../../services/socketService';
import { getAllRooms, deleteJoinedRoom, setCurrentRoom } from '../../actions/roomActions';
import PropTypes from 'prop-types'
import { setPrivateMessages } from '../../actions/messageActions';

class ChatContainer extends React.Component {

    componentDidMount() {
        const { getAllRooms, deleteJoinedRoom, setCurrentRoom, setPrivateMessages } = this.props

        socket.on('updateusers', (r, users, ops) => {
            getAllRooms()
        })

        socket.on('kicked', (r, user, username) => {
            const { userName, room } = this.props
            if (user === userName) {
                deleteJoinedRoom(r)
                if (room === r) {
                    setCurrentRoom("lobby")
                }
            }
        })

        socket.on('banned', (r, user, username) => {
            const { userName, room } = this.props
            if (user === userName) {
                deleteJoinedRoom(r)
                if (room === r) {
                    setCurrentRoom("lobby")
                }
            }
        })

        socket.on('recv_privatemsg', (username, message) => {
            var messageObj = {
				nick : username,
				timestamp :  new Date().toLocaleString(),
				message : message
			};
            setPrivateMessages(messageObj)
        }) 
    }

    render() {
        return (
        <ChatWindow />
        )
    }
}

const mapStateToProps = reduxStoreState => {
    return {
        room: reduxStoreState.room,
        userName: reduxStoreState.userName
    }
}

ChatContainer.propTypes = {
    userName: PropTypes.string,
    room: PropTypes.string,
    getAllRooms: PropTypes.func.isRequired,
    setCurrentRoom: PropTypes.func.isRequired,
    deleteJoinedRoom: PropTypes.func.isRequired,
    setPrivateMessages: PropTypes.func.isRequired
}

ChatContainer.defaultProps = {
    userName: 'username',
    room: 'lobby'
}

export default connect(mapStateToProps, { setPrivateMessages, getAllRooms, setCurrentRoom, deleteJoinedRoom })(ChatContainer);