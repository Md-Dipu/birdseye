import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Bookings from '../Bookings/Bookings';

const Dashboard = () => {
    const { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Redirect to={`${url}/overview`} />
            </Route>
            <Route exact path={`${path}/bookings`}>
                <Bookings />
            </Route>
        </Switch>
    );
};

export default Dashboard;