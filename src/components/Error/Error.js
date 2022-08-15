import React from 'react';
import './Error.css';
import {useLocation} from 'react-router-dom';

const Error = ({errors}) => {
    const location = useLocation();

    // console.log(errors.password)
    return (
        <span className={location.pathname === '/profile' ? 'error error_active error_change_position'  : 'error error_active'}>{errors}</span>
    );
};

export default Error;
