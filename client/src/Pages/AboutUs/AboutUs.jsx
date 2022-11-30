import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { backToTop } from '../../utilities/utilities';

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
                                <li>Carefull and good services.</li>
                                <li>Rich hight quality foods.</li>
                                <li>Historical and beautiful Plance</li>
                            </ul>
                            <Button
                                variant="primary"
                                onClick={() => history.push('/plans')}
                            >Book a ticket now</Button>
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
            <div id="contact" style={{ backgroundColor: '#e6e3e3' }}>
                <Container>
                    <Row className="py-4 align-items-center">
                        <Col xs={12} lg={6}>
                            <div className="shadow">
                                <div className="border border-white py-3 px-4" style={{ backgroundColor: "#e6e3e3" }}>
                                    <h2>Contact Us</h2>
                                    <p className="fw-light">Please fill this form in a decent manner</p>
                                </div>
                                <form onSubmit={e => e.preventDefault()} className="bg-white border border-white py-3 px-4">
                                    <div className="mb-3">
                                        <label htmlFor="full-name" className="form-label fw-bold">Full Name <span className="text-danger">*</span></label>
                                        <input type="text" name="full-name" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">Email <span className="text-danger">*</span></label>
                                        <input type="email" name="email" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label fw-bold">Your message <span className="text-danger">*</span></label>
                                        <textarea rows={5} name="message" className="form-control" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary d-block mx-auto text-uppercase">submit</button>
                                </form>
                            </div>
                        </Col>
                        <Col xs={12} lg={6} className="my-4">
                            <h1 className="text-uppercase">Get help <br /> <span className="text-info">Support Us</span></h1>
                            <p className="my-3" style={{ color: '#626262' }}>Faceing problems don't waste your time just send us a messge. We'll contact you as soon as possible. You'll get 24/7 support from us. So buy a ticket and enjoy the tip with us. Hope you enjoy and learn as you wanted.</p>
                            <p className="mb-3" style={{ color: '#626262' }}>Also send us your feedback so that we can do better in future and I love to get feedback from your customers. Your feedback is important for us. Pleace Support Us by your feedback. Happy Tour.</p>
                            <Button
                                variant="info"
                                onClick={() => history.push('/plans')}
                                className="text-uppercase"
                            >Book a ticket now</Button>{" "}
                            <Button
                                variant="primary"
                                onClick={() => history.push('/')}
                                className="text-uppercase"
                            >Back to home</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default AboutUs;