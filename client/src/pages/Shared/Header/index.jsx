import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';
import DashboardMenu from '../../Dashboard/DashboardMenu';
import AuthNavMenu from '../../Authentication/AuthNavMenu';

const Header = () => {
    const { user } = useAuth();
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Birdseye</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {user && <DashboardMenu />}
                        <Nav.Link as={Link} to="/plans">Plans</Nav.Link>
                        <Nav.Link as={Link} to="/about-us">About us</Nav.Link>
                        {!user ? <>
                            <Nav.Link as={Link} to="/login" variant="link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>
                            <Nav.Link as="li" className="p-0">
                                <Button as={Link} variant="secondary" to="/register" className="rounded-pill">Register</Button>
                            </Nav.Link>
                        </> : <AuthNavMenu />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;