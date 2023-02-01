import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { scrollToSectionStart } from '../../utilities/utilities';
import Account from './Account';
import DeleteAccount from './DeleteAccount';
import RoleRequest from './RoleRequest';

const Settings = () => {
    return (
        <Container>
            <Row>
                <Col xs="12" md="3" lg="2">
                    <ListGroup variant="flush" className="position-sticky top-0">
                        <ListGroup.Item as={Link} to="#account" onClick={scrollToSectionStart('account')} action>Account</ListGroup.Item>
                        <ListGroup.Item as={Link} to="#role-request" onClick={scrollToSectionStart('role-request')} action>Role request</ListGroup.Item>
                        <ListGroup.Item as={Link} to="#delete-account" onClick={scrollToSectionStart('delete-account')} action>Delete</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Account />
                    <RoleRequest />
                    <DeleteAccount />
                </Col>
            </Row>
        </Container>
    );
};

export default Settings;