import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

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
                        <h3>About Birdeye</h3>
                        <p>Birdeye is one of the most popular travel agenci in Bangladesh. Because of services and awesome plans. If you want to join our next tour book one or more tickets now. If your have any question please contact us.</p>
                    </Col>
                    <Col>
                        <Row  xs={1} md={2}>
                            <Col>
                                <h4>Quick Link</h4>
                                <ul type="square">
                                    <li>Home</li>
                                    <li>About</li>
                                    <li>Plans</li>
                                </ul>
                            </Col>
                            <Col>
                                <h4>Stay Updated</h4>
                                <p>To get message from your site please subscribe us by email address.</p>
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