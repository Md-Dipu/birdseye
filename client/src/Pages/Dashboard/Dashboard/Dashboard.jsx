import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../NotFound/NotFound';
import Bookings from '../Bookings/Bookings';
import ManagePlans from '../ManagePlans/ManagePlans';

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
            <Route exact path={`${path}/manage-plans`}>
                <ManagePlans />
            </Route>
            <Route exact path={`${path}/*`}>
                <NotFound />
            </Route>
        </Switch>
    );
};

export default Dashboard;