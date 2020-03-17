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
            cardY: 0
        };
        this.displayUserCard = this.displayUserCard.bind(this);
        this.closeUserCard = this.closeUserCard.bind(this);
    }

    changeRoom(r) {
        const { setCurrentRoom, setJoinedRooms, joinedRooms } = this.props
        if (!joinedRooms.includes(r)) {
            socket.emit('joinroom', {room: r}, calllback =>{
                console.log(calllback)
            })
            setJoinedRooms(r)
        }
        setCurrentRoom(r)

    }

    newRoom() {
        this.setState({
            newRoomOpen: true
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
    
    closeNewRoom(e) {
        e.preventDefault()
        this.setState({
            newRoomOpen: false
        })
    }

    sendMessage(message) {
        const { room } = this.props
        if (message === '') { return false; }
            socket.emit('sendmsg', { roomName: room, msg: message });
            this.setState({ 
                message: '' 
            });
    }

    submitForm(e) {
        e.preventDefault()
        const { rooms } = this.props
        const { newRoomName } = this.state
        if (room === "") {
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
        const { rooms, room } = this.props
        if (rooms[room] !== undefined) {
            return (rooms[room].messageHistory)
        }
        else {
            return []
        } 
    }

    displayUserCard(e) {
        e.preventDefault()
        const x = e.clientX
        const y = e.clientY
        this.setState({
            cardX: x,
            cardY: y,
        })
        this.setState({ 
            userCard: true
         }, () => {
            document.addEventListener('click', this.closeUserCard);
          });
    }

    closeUserCard(e) {
        this.setState({ userCard: false }, () => {
            document.removeEventListener('click', this.closeUserCard);
        });  
      }

    render() {
        const { rooms, room, userName } = this.props;
        const { message, newRoomOpen, newRoomName, userCard, cardX, cardY } = this.state;
        const users = this.getUsers()
        const ops = this.getOps()
        const messages = this.getMessages()
        const cardPosition = {
            position: "absolute",
            top: cardY+"px",
            left: cardX+"px"
        }
        return (
            <div>
                <div className="test" style={cardPosition}>
                <Card visible={userCard} >
                    <button> OP </button>
                    <button> Kick </button>
                    <button> Ban </button>
                    <button> Message </button>
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
                        
                        <button className="btn btn-danger" onClick={(e) => this.closeNewRoom(e)} > Cancel </button>

                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary"
                            style={{float: 'right', marginTop: '10'}}/> 
                    </Form>
                    </Modal>
                    <h3 className="chat-header">
                        Chat.io 
                    </h3>
                    <div className="chat">
                        <Users users={users} ops={ops} userCard={userCard} displayUserCard={(e) => this.displayUserCard(e)} username={userName} />
                        <Rooms rooms={Object.keys(rooms)} changeRoom={(r) => this.changeRoom(r)} newRoom={() => this.newRoom()} leaveRoom={() => this.leaveRoom()} currentRoom={room} />
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
        messages: reduxStoreState.messages,
        rooms: reduxStoreState.rooms,
        room: reduxStoreState.room,
        joinedRooms: reduxStoreState.joinedRooms,
        userName: reduxStoreState.userName
    }
}

export default connect(mapStateToProps, { getAllRooms, setCurrentRoom, setJoinedRooms, deleteJoinedRoom })(ChatWindow);
