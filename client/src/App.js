import React, { useEffect }from 'react';
import { connect } from 'react-redux'
import ChatContainer from './components/ChatContainer';
import LoginModal from './components/Login'
import { setUsers, setUserName } from './actions/userActions'
import { getAllMessages } from './actions/messageActions'
import { getAllRooms, setCurrentRoom, setJoinedRooms, deleteJoinedRoom } from './actions/roomActions';

const App = ({ }) => {
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

export default connect(null, { setUsers, getAllMessages, getAllRooms, setCurrentRoom, setJoinedRooms, deleteJoinedRoom, setUserName })(App);
