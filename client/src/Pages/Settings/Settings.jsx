import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { scrollToSectionStart } from '../../utilities/utilities';
import Account from './Account';

const Settings = () => {
    return (
        <Container>
            <Row>
                <Col xs="12" md="3" lg="2">
                    <ListGroup variant="flush">
                        <ListGroup.Item action onClick={scrollToSectionStart('account')}>Account</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Account />
                </Col>
            </Row>
        </Container>
    );
};

export default Settings;