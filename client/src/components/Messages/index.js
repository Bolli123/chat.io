import React from 'react';
import PropTypes from 'prop-types'


const Messages = props => (
    <div className="messages">
        { props.messages.map(m => <div key={ m.timestamp } className="message"> 
            <span className="chat-timestamp">[{m.timestamp}]</span> <span className="chat-nickname">&#60;{m.nick}&#62;</span> <span className="chat-message">{ m.message }</span> 
        </div>) }
    </div>
);

Messages.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            nick: PropTypes.string,
            timestamp: PropTypes.string,
            message: PropTypes.string
        })
    )
}

Messages.defaultProps = {
    messages: []
}

export default Messages