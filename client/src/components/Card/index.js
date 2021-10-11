import React from 'react';
import PropTypes from 'prop-types'

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

Card.propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired
}

export default Card