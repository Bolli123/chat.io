import React from 'react';

const Card = ({ children, visible }) => (
    <div>        
    {
        visible
        ? (
            <div className="card-menu" id="card">
                { children } 
            </div>
        )
        : (
            null
        )
    }
    </div>
)

export default Card