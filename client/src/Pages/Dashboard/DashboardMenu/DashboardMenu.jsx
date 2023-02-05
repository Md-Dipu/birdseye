import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const DashboardMenu = () => {
    const { user } = useAuth();

    return (
        <NavDropdown title="Dashboard" menuVariant="dark" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/dashboard/bookings">Bookings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/dashboard/notifications">Notifications</NavDropdown.Item>
            {(user.role === 'admin' || user.role === 'manager') && <>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/dashboard/manage-plans">Manage plans</NavDropdown.Item>
            </>}
        </NavDropdown>
    );
};

export default DashboardMenu;