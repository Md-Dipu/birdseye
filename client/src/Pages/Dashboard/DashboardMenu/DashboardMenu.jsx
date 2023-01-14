import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardMenu = () => {
    return (
        <NavDropdown title="Dashboard" menuVariant="dark" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/dashboard/bookings">Bookings</NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
        </NavDropdown>
    );
};

export default DashboardMenu;