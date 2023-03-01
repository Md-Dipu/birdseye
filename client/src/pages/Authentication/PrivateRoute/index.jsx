import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading';
import Unauthorized from '../Unauthorized';

const PrivateRoute = ({ children, allowedRoles, ...rest }) => {
    const { user, isLoading } = useAuth();

    if (allowedRoles) {
        const roles = allowedRoles.split(',');
        if (!roles.find(role => role === user.role)) {
            return <Unauthorized />
        }
    }

    if (isLoading) {
        return (
            <Loading height="60" />
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) => user ? children : <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            />}
        />
    );
};

export default PrivateRoute;