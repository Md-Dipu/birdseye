/* 
    private route is not working for version change (v6).
    so I protect route by personal way.
    I am sorry for that.
    today is 19/11/2021 - don't have much time to search more about private route.
*/

import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';

const RouteProtector = ({ element, from }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loading height="80" />;
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: from }} />;
    }
    
    return element;
};

export default RouteProtector;