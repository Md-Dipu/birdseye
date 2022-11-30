import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
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