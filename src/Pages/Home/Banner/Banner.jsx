import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import './Banner.css';

const Banner = () => {
    return (
        <div className="text-center text-light tourism-banner">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Form className="mb-3">
                            <InputGroup>
                                <Form.Control type="text" className="home-search-bar" />
                                <Button variant="success"><FontAwesomeIcon icon={faSearch} /></Button>
                            </InputGroup>
                        </Form>
                        <h1 className="banner-title text-uppercase">Travel and Learn</h1>
                        <h3>Trave is the way to learn more and stay peaceful.</h3>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;