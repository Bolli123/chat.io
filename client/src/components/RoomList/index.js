import React from 'react';
import PropTypes from 'prop-types'

const Rooms = props => (
    <div className="rooms">
        {
            props.currentRoom === "lobby"
            ?
            
                <button type="button" className="btn btn-danger leave-room-btn disabled" disabled={true}>Leave Room</button>
            :
                <button type="button" className="btn btn-danger leave-room-btn" onClick={() => props.leaveRoom()}>Leave Room</button>
        }
        <button type="button" className="btn btn-success create-room-btn" onClick={() => props.newRoom()}>New Room</button>
        { props.rooms.map((r, index) => 
            
            r === props.currentRoom 
            ?
                <div className="single-room-container" key={ index }>
                    <button type="button" key={ index } className="room-selected btn btn-link" onClick={() => props.changeRoom(r)}>{ r }</button>
                </div>  
            :
                <div className="single-room-container" key={ index }>
                    <button type="button" key={ index } className="room btn btn-link" onClick={() => props.changeRoom(r)}>{ r }</button>
                </div> 
            
            )}
    </div>
);

Rooms.propTypes = {
    currentRoom: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    changeRoom: PropTypes.func.isRequired,
    newRoom: PropTypes.func.isRequired,
    leaveRoom: PropTypes.func.isRequired
}

export default Rooms