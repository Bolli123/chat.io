import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow'
import { connect } from 'react-redux'
import { socket } from '../../services/socketService';
import { setUsers } from '../../actions/userActions';
import { getAllRooms } from '../../actions/roomActions';


class ChatContainer extends React.Component {
    componentDidMount() {
        const { getAllRooms, setUsers } = this.props
        const { room } = this.props
        socket.on('updateusers', (r, users, ops) => {
            if (r === room) {
                //TODO: ops
                setUsers(users)
            }
            getAllRooms()
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
        users: reduxStoreState.users,
        room: reduxStoreState.room
    }
}

export default connect(mapStateToProps, { setUsers, getAllRooms })(ChatContainer);