import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Birdseye</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/plans">Plans</Nav.Link>
                        <Nav.Link as={Link} to="/about-us">About us</Nav.Link>
                        {!user ? <>
                            <Nav.Link as={Link} to="/login" variant="link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>
                            <Nav.Link as="li" className="p-0">
                                <Button as={Link} variant="secondary" to="/register" className="rounded-pill">Register</Button>
                            </Nav.Link>
                        </> : <NavDropdown title={<><FontAwesomeIcon icon={faUser} /> {user.name}</>} menuVariant="dark" id="basic-nav-dropdown">
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
    );
};

export default Header;