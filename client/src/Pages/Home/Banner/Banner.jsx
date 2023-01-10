import React, { useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Banner.css';

const Banner = () => {
    const inputRef = useRef();
    const history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        history.push(`/plans?search=${inputRef.current.value}`);
    };

    return (
        <div className="text-center text-light tourism-banner">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Form className="mb-3" onSubmit={onSubmit}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    ref={inputRef}
                                    className="home-search-bar"
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="success"
                                ><FontAwesomeIcon icon={faSearch} /></Button>
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