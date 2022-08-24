import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    return localStorage.getItem('jwt') ? <Outlet/> : <Navigate to="/" replace/>
};

export default ProtectedRoute;