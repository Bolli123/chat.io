import React from 'react';
import { socket } from '../../services/socketService';
import { connect } from 'react-redux'
import { setCurrentRoom, setJoinedRooms, getAllRooms, deleteJoinedRoom } from '../../actions/roomActions'
import Form from '../Form'
import Modal from 'react-modal';
import Card from '../Card'
import Messages from '../Messages'
import Users from '../UsersList'
import Rooms from '../RoomList'
import Input from '../Input'
import PropTypes from 'prop-types'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

class ChatWindow extends React.Component {
    componentDidMount() {
        const { getAllRooms } = this.props
        socket.on('updatechat', (r, messages) => {
            getAllRooms()
        });

    }

    constructor(props) {
        super(props);
        this.state = {
            message: '', /* Current message */
            newRoomOpen: false,
            newRoomName: '',
            userCard: false,
            cardX: 0,
            cardY: 0,
            selectedUser: '',
            displayPms: false,
            privateMessageOpen: false,
            newPrivateMessage: ''
        };
        this.displayUserCard = this.displayUserCard.bind(this);
        this.closeUserCard = this.closeUserCard.bind(this);
    }

    checkIfBanned(r) {
        const { rooms, userName } = this.props
        if (rooms[r]) {
            const bannedUsers = Object.keys(rooms[r].banned)
            for (var i = 0; i < bannedUsers.length; i++) {
                if (bannedUsers[i] === userName) {
                    return true
                }
            }
        }
        return false
    }

    changeRoom(r) {
        const { setCurrentRoom, setJoinedRooms, joinedRooms } = this.props
        if (!joinedRooms.includes(r)) {
            socket.emit('joinroom', {room: r}, callback => {
                if (callback) {
                    setJoinedRooms(r)
                }
            })
        }
        if (!this.checkIfBanned(r)) {
            setCurrentRoom(r)
        }
        else {
            alert("You're banned from this room")
        }
        this.setState({
            displayPms: false
        })
    }

    newRoom(e) {
        const { newRoomOpen } = this.state
        e.preventDefault()
        this.setState({
            newRoomOpen: !newRoomOpen
        })
    }

    leaveRoom() {
        const { room, setCurrentRoom, deleteJoinedRoom } = this.props
        if (room === "lobby") {
            return
        }
        socket.emit('partroom', room)
        deleteJoinedRoom(room)
        setCurrentRoom("lobby")
    }

    sendMessage(message) {
        const { room } = this.props
        if (message === '') { return }
            socket.emit('sendmsg', { roomName: room, msg: message });
            this.setState({ 
                message: '' 
            });
    }

    submitForm(e) {
        e.preventDefault()
        const { rooms } = this.props
        const { newRoomName } = this.state
        if (newRoomName === "") {
            return
        }
        for (var room in rooms) {
            if (room === newRoomName) {
                return
            }
        }
        this.changeRoom(newRoomName)
        this.setState({
            newRoomOpen: false
        })
    }

    getUsers() {
        const { rooms, room } = this.props
        if (rooms[room] !== undefined) {
            return Object.keys(rooms[room].users)
        }
        else {
            return []
        } 
    }

    getOps() {
        const { rooms, room } = this.props
        if (rooms[room] !== undefined) {
            return Object.keys(rooms[room].ops)
        }
        else {
            return []
        } 
    }

    getMessages() {
        const { rooms, room, privateMessages } = this.props
        const { displayPms } = this.state
        if (rooms[room] !== undefined) {
            if (displayPms) {
                return privateMessages
            }
            return (rooms[room].messageHistory)
        }
        else {
            return []
        } 
    }

    checkIfOp(user) {
        const { rooms, room } = this.props
        for (var op in rooms[room].ops) {
            if (op === user) {
                return true
            }
        }
        return false
    }

    OpUser(e) {
        e.preventDefault()
        const { selectedUser } = this.state
        const { room, userName } = this.props
        if (this.checkIfOp(userName)) {
            socket.emit('op', { user: selectedUser, room: room }, callback => {
                console.log(callback)
            })
        }
    }

    kickUser(e) {
        e.preventDefault()
        const { selectedUser } = this.state
        const { room, userName } = this.props
        if (this.checkIfOp(userName)) {
            socket.emit('kick', { user: selectedUser, room: room }, callback => {
                console.log(callback)
            })
        }
    }

    banUser(e) {
        e.preventDefault()
        const { selectedUser } = this.state
        const { room, userName } = this.props
        if (this.checkIfOp(userName) && !this.checkIfOp(selectedUser)) {
            socket.emit('ban', { user: selectedUser, room: room }, callback => {
                console.log(callback)
            })
        }
    }
    
    displayUserCard(e, user) {
        e.preventDefault()
        const x = e.clientX
        const y = e.clientY
        const { userName } = this.props
        if (user === userName) { return }
        this.setState({
            cardX: x,
            cardY: y,
            selectedUser: user
        })
        this.setState({ 
            userCard: true
         }, () => {
            document.addEventListener('click', this.closeUserCard);
          });
    }

    displayPms(e) {
        e.preventDefault()
        const { displayPms } = this.state
        this.setState({
            displayPms: !displayPms
        })
    }

    closeUserCard(e) {
        this.setState({ 
            userCard: false, 
        }, () => {
            document.removeEventListener('click', this.closeUserCard);
        });  
      }

    newPrivateMessage(e) {
        e.preventDefault()
        const { privateMessageOpen } = this.state
        this.setState({
            privateMessageOpen: !privateMessageOpen
        })
    }

    sendPm(e) {
        e.preventDefault()
        const { newPrivateMessage, selectedUser } = this.state
        socket.emit('privatemsg', { nick: selectedUser, message: newPrivateMessage }, callback => {
            if (callback) {
                this.setState({
                    privateMessageOpen: false
                })
            }
        })
    }
    
    render() {
        const { rooms, userName, room } = this.props;
        const { message, newRoomOpen, newRoomName, userCard, cardX, cardY, privateMessageOpen, newPrivateMessage } = this.state;
        const users = this.getUsers()
        const ops = this.getOps()
        const messages = this.getMessages()
        console.log(messages)
        const cardPosition = {
            position: "absolute",
            top: cardY+"px",
            left: cardX+"px"
        }
        console.log(rooms)
        return (
            <div>
                <div className="test" style={cardPosition}>
                <Card visible={userCard} >
                    <button onClick={(e) => this.OpUser(e)}> OP </button>
                    <button onClick={(e) => this.kickUser(e)}> Kick </button>
                    <button onClick={(e) => this.banUser(e)} > Ban </button>
                    <button onClick={(e) => this.newPrivateMessage(e)} > Message </button>
                </Card>
                </div>
                <div className="chat-window">
                    <Modal
                        isOpen={newRoomOpen}
                        style={customStyles}
                        contentLabel="Room Name: "
                        ariaHideApp={false}
                    >
                        <Form onSubmit={e => this.submitForm(e)}>
                        <Input
                            type='text'
                            value={ newRoomName }
                            name="name"
                            htmlId='name'
                            label='Room Name: '
                            onInput={e => this.setState({ newRoomName: e.target.value })} />  
                        
                        <button className="btn btn-danger" onClick={(e) => this.newRoom(e)} > Cancel </button>

                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary"
                            style={{float: 'right', marginTop: '10'}}/> 
                    </Form>
                    </Modal>
                    <Modal
                        isOpen={privateMessageOpen}
                        style={customStyles}
                        contentLabel="Message: "
                        ariaHideApp={false}
                    >
                        <Form onSubmit={e => this.sendPm(e)}>
                        <Input
                            type='text'
                            value={ newPrivateMessage }
                            name="name"
                            htmlId='name'
                            label='Message: '
                            onInput={e => this.setState({ newPrivateMessage: e.target.value })} />  
                        
                        <button className="btn btn-danger" onClick={(e) => this.newPrivateMessage(e)} > Cancel </button>

                        <input
                            type="submit"
                            value="Send"
                            className="btn btn-primary"
                            style={{float: 'right', marginTop: '10'}}/> 
                    </Form>
                    </Modal>
                    <h3 className="chat-header">
                        Chat.io 
                    </h3>
                    <div className="chat">
                        <Users users={users} ops={ops} userCard={userCard} displayUserCard={(e, selectedUser) => this.displayUserCard(e, selectedUser)} username={userName} displayPMs={(e) => this.displayPms(e)}/>
                        <Rooms rooms={Object.keys(rooms)} changeRoom={(r) => this.changeRoom(r)} newRoom={(e) => this.newRoom(e)} leaveRoom={() => this.leaveRoom()} currentRoom={room} />
                        <div className="messageContainer">
                            <Messages messages={ messages } />
                            <div className="input-group mb-3 input-container">
                                <input className="form-control" type="text" value={ message } onChange={e => this.setState({ message: e.target.value })} placeholder="Enter your message here..." />
                                <div className="input-group-append">
                                    <button className="btn btn-success" type="button" onClick={() => this.sendMessage(message)}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = reduxStoreState => {
    return {
        rooms: reduxStoreState.rooms,
        room: reduxStoreState.room,
        joinedRooms: reduxStoreState.joinedRooms,
        userName: reduxStoreState.userName,
        privateMessages: reduxStoreState.privateMessages
    }
}

ChatWindow.propTypes = {
    userName: PropTypes.string,
    room: PropTypes.string,
    rooms: PropTypes.objectOf(PropTypes.shape({
        users: PropTypes.object,
        ops: PropTypes.object,
        banned: PropTypes.object,
        messageHistory: PropTypes.array,
        topic: PropTypes.string,
        locked: PropTypes.bool,
        password: PropTypes.string
    })),
    joinedRooms: PropTypes.arrayOf(PropTypes.string),
    getAllRooms: PropTypes.func.isRequired,
    setCurrentRoom: PropTypes.func.isRequired,
    deleteJoinedRoom: PropTypes.func.isRequired,
    privateMessages: PropTypes.array,
}

ChatWindow.defaultProps = {
    userName: 'username',
    room: 'lobby',
    rooms: {},
    joinedRooms: [],
    privateMessages: []
}

export default connect(mapStateToProps, { getAllRooms, setCurrentRoom, setJoinedRooms, deleteJoinedRoom })(ChatWindow);
