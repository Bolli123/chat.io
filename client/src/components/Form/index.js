import React from 'react';
import PropTypes from 'prop-types'


const Form = ({onSubmit, children}) => (
    <form onSubmit={onSubmit} className="form form-horizontal">
        {children}
    </form>
);

Form.propTypes = {
    onSubmit: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node)
}

export default Form;