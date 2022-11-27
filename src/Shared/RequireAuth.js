import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {

    const token = false
    const location = useLocation();
    if (!token) {
        return <Navigate to='/login' state={{ from: location }}></Navigate>
    }
    return children;
};

export default RequireAuth;