import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../Authentication/PrivateRoute/RouteProtector';
import NotFound from '../../NotFound';
import Bookings from '../Bookings/Bookings';
import PlanDetails from '../PlanDetails/PlanDetails';
import AddPlan from '../AddPlan/MainForm/AddPlan';
import ManagePlans from '../ManagePlans/ManagePlans';
import Notifications from '../Notifications/Notifications';

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
            <Route exact path={`${path}/notifications`}>
                <Notifications />
            </Route>
            <PrivateRoute allowedRoles="admin,manager" exact path={`${path}/manage-plans`}>
                <ManagePlans />
            </PrivateRoute>
            <PrivateRoute allowedRoles="admin" exact path={`${path}/manage-plans/add-new-plan`}>
                <AddPlan />
            </PrivateRoute>
            <PrivateRoute allowedRoles="admin,manager" exact path={`${path}/manage-plans/:planId`}>
                <PlanDetails />
            </PrivateRoute>
            <Route exact path={`${path}/*`}>
                <NotFound />
            </Route>
        </Switch>
    );
};

export default Dashboard;