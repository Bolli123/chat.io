import React from 'react';

const Users = props => (
    <div className="users">
        { props.ops.map(o => 
        <div className="user-container">
            <button key={ o } className="btn btn-link user">
                @{ o }
            </button>
        </div>
        ) }
        { props.users.map(u => 
        <div className="user-container">
            {
                props.username === u
                ?
                <button key={ u } className="btn btn-link username" onClick={(e) => props.displayUserCard(e)}>
                    { u }
                </button>
                :
                <button key={ u } className="btn btn-link user" onClick={(e) => props.displayUserCard(e)}>
                    { u }
                </button>
            }
        </div>
        ) }
    </div>
);

export default Users