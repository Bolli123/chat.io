import React, { useEffect }from 'react';
import { connect } from 'react-redux'
import ChatContainer from './components/ChatContainer';
import LoginModal from './components/Login'
import { setUsers, setUserName, getUserName } from './actions/userActions'
import { getAllMessages, setPrivateMessages } from './actions/messageActions'
import { getAllRooms, setCurrentRoom, setJoinedRooms, deleteJoinedRoom } from './actions/roomActions';

const App = () => {
    useEffect(() => {
        getAllMessages()
        getAllRooms()
    }, [getAllMessages, getAllRooms])
        return (
            <div className="container">
                <LoginModal/>
                <ChatContainer className="chat" />
            </div>
        );
}

export default connect(null, { setPrivateMessages, getAllMessages, getAllRooms, setCurrentRoom, setJoinedRooms, deleteJoinedRoom, setUserName, getUserName })(App);
