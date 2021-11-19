import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/#home">Birdeye</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/#home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/plans">All Plans</Nav.Link>
                    <Nav.Link as={Link} to="/about">About us</Nav.Link>
                    {!user ?  <Nav.Link as={Button} variant="primary" onClick={() => navigate('/login')}><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link> :
                    <NavDropdown title={<><FontAwesomeIcon icon={faUser} /> {user.displayName}</>} menuVariant="dark" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/my-orders">My Orders</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/manage-all-orders">Manage All Orders</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/add-new-plan">Add a New Plan</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Button} variant="link" onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt} /> Log out</NavDropdown.Item>
                    </NavDropdown>}
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    );
};

export default Header;