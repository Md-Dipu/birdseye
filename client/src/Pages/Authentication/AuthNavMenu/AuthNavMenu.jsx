import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { scrollToSectionStart } from '../../../utilities/utilities';

const AuthNavMenu = () => {
    const { user, logOut } = useAuth();

    return (
        <NavDropdown title={<><FontAwesomeIcon icon={faUser} /> {user.name}</>} menuVariant="dark" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/settings#account" onClick={scrollToSectionStart('account')}>Account</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Button} variant="link" onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt} /> Log out</NavDropdown.Item>
        </NavDropdown>
    );
};

export default AuthNavMenu;