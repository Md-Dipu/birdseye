import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { scrollToSectionStart } from '../../../utilities/utilities';

const Footer = () => {
    const { register, handleSubmit, reset } = useForm();
    const handleSubscribe = data => {
        reset();
    }

    return (
        <div className="bg-light py-4">
            <Container>
                <Row xs={1} md={2}>
                    <Col>
                        <h3>About Birdseye</h3>
                        <p style={{ color: '#626262' }}>Birdeye is one of the most popular travel agenci in Bangladesh. Because of services and awesome plans. If you want to join our next tour book one or more tickets now. If your have any question please contact us.</p>
                    </Col>
                    <Col>
                        <Row xs={1} md={2}>
                            <Col>
                                <h4>Quick Link</h4>
                                <ul type="square" className="text-decoration-none">
                                    <li><Link to="/" className="text-decoration-none">Home</Link></li>
                                    <li><Link to="/plans" className="text-decoration-none">Plans</Link></li>
                                    <li><Link to="/about-us" className="text-decoration-none">About</Link></li>
                                    <li>
                                        <Link
                                            to="/about-us#contact"
                                            className="text-decoration-none"
                                            onClick={scrollToSectionStart('contact')}
                                        >Contact</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col>
                                <h4>Stay Updated</h4>
                                <p style={{ color: '#626262' }}>To get message from our site please subscribe us by email address.</p>
                                <form onSubmit={handleSubmit(handleSubscribe)}>
                                    <input type="email" className="form-control" placeholder="Email" {...register('email')} />
                                    <input type="submit" className="btn btn-primary form-control mt-2" value="Subscribe" />
                                </form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;