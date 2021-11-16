import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <>
            <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="#home">Home</Nav.Link>
                    <Nav.Link as={Link} to="#link">Link</Nav.Link>
                    <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="#action/3.1">My Orders</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.2">Manage All Orders</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.3">Add a New Service</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Button} variant="link" onClick={() => console.log('logout button clicked')}><FontAwesomeIcon icon={faSignOutAlt} /> Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    );
};

export default Header;