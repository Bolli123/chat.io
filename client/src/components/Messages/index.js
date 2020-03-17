import React from 'react';

const Messages = props => (
    <div className="messages">
        { props.messages.map(m => <div key={ m.timestamp } className="message"> 
            <span className="chat-timestamp">[{m.timestamp}]</span> <span className="chat-nickname">&#60;{m.nick}&#62;</span> <span className="chat-message">{ m.message }</span> 
        </div>) }
    </div>
);

export default Messages