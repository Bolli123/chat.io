import React from 'react';
import PropTypes from 'prop-types'


const Users = props => (
    <div className="users">
        <button className="btn btn-secondary pms" onClick={(e) => props.displayPMs(e)}> Private Messages </button>
        { props.ops.map(o => 
        <div className="user-container" key={ o }>
            {
                props.username === o
                ?
                <button key={ o } className="btn btn-link username" onClick={(e) => props.displayUserCard(e, o)}>
                    @{ o }
                </button>
                :
                <button key={ o } className="btn btn-link user" onClick={(e) => props.displayUserCard(e, o)}>
                    @{ o }
                </button>
            }
        </div>
        ) }
        { props.users.map(u => 
        <div className="user-container" key={ u }>
            {
                props.username === u
                ?
                <button key={ u } className="btn btn-link username" onClick={(e) => props.displayUserCard(e, u)}>
                    { u }
                </button>
                :
                <button key={ u } className="btn btn-link user" onClick={(e) => props.displayUserCard(e, u)}>
                    { u }
                </button>
            }
        </div>
        ) }
    </div>
);

Users.propTypes = {
    ops: PropTypes.arrayOf(PropTypes.string).isRequired,
    users: PropTypes.arrayOf(PropTypes.string).isRequired,
    username: PropTypes.string.isRequired,
    displayUserCard: PropTypes.func.isRequired,
    displayPMs: PropTypes.func.isRequired
}

export default Users