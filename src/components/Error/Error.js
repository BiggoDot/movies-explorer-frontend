import React from 'react';
import './Error.css';

const Error = ({errors}) => {

    // console.log(errors.password)
    return (
        <span className='error error_active'>{errors}</span>
    );
};

export default Error;
