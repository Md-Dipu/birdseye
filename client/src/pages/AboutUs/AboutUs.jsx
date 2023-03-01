import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { backToTop } from '../../utilities/utilities';
import Contact from './Contact';
import ReviewWebsite from './ReviewWebsite';

const AboutUs = () => {
    const history = useHistory();
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }

    return (
        <>
            <div className="text-light" style={{ backgroundColor: "#113e55" }}>
                <Container>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} className="my-3">
                            <h4 className="text-uppercase text-info">About us</h4>
                            <p>Tourism is travel for pleasure or business; also the theory and practice of touring, the business of attracting, accommodating, and entertaining tourists, and the business of operating tours.</p>
                            <h6 className="text-uppercase text-secondary">why our service?</h6>
                            <ul>
                                <li>Careful and good services.</li>
                                <li>Rich hight quality foods.</li>
                                <li>Historical and beautiful Place.</li>
                            </ul>
                            <Button
                                variant="primary"
                                onClick={() => history.push('/plans')}
                            >Book a ticket now</Button>{" "}
                            <ReviewWebsite />
                        </Col>
                        <Col xs={12} md={6} className="my-3">
                            <Row className="justify-content-center">
                                <Col xs={12} md={8}>
                                    <Image src="https://i.ibb.co/1K5SWxg/about-page.jpg" alt="" className="d-block" fluid />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Contact />
        </>
    );
};

export default AboutUs;