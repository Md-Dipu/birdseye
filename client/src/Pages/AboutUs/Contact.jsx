import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { postWebMail } from '../../api/notificationsAPI';

const Contact = () => {
    const history = useHistory();
    const { handleSubmit, register, reset } = useForm();
    const onSubmit = (data) => {
        postWebMail(data).then(() => reset())
            .catch(error => console.warn(error.message));
    };

    return (
        <div id="contact" style={{ backgroundColor: '#e6e3e3' }}>
            <Container>
                <Row className="py-4 align-items-center">
                    <Col xs={12} lg={6}>
                        <div className="shadow">
                            <div className="border border-white py-3 px-4" style={{ backgroundColor: "#e6e3e3" }}>
                                <h2>Contact Us</h2>
                                <p className="fw-light">Please fill this form in a decent manner</p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-white py-3 px-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" {...register('name', { required: true })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" {...register('email', { required: true })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={5} {...register('message', { required: true })} />
                                </Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>{" "}
                                <Button variant="outline-secondary" type="reset" onClick={() => reset()}>Cancel</Button>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={12} lg={6} className="my-4">
                        <h1 className="text-uppercase">Get help <br /> <span className="text-info">Support Us</span></h1>
                        <p className="my-3" style={{ color: '#626262' }}>Facing problems don't waste your time just send us a message. We'll contact you as soon as possible. You'll get 24/7 support from us. So buy a ticket and enjoy the tip with us. Hope you enjoy and learn as you wanted.</p>
                        <p className="mb-3" style={{ color: '#626262' }}>Also send us your feedback so that we can do better in future and I love to get feedback from your customers. Your feedback is important for us. Please Support Us by your feedback. Happy Tour.</p>
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
    );
};

export default Contact;