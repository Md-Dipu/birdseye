import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Feature = () => {
    const history = useHistory();
    return (
        <div style={{ backgroundColor: '#9dcfce' }}>
            <Container>
                <Row xs={1} lg={2} className="align-items-center">
                    <Col className="pt-4 pt-lg-0">
                        <h4 className="text-uppercase">World is beautiful</h4>
                        <p>Someone says, "<span className="fst-italic">The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.</span>" This is what we want to felt you. Please join if you don't wanna miss our next tip.</p>
                        <Button
                            variant="success"
                            size="sm"
                            className="text-uppercase"
                            onClick={() => history.push('/plans')}
                        >buy a tickt now</Button>
                    </Col>
                    <Col>
                        <Image
                            src="https://i.ibb.co/hfPWQT6/feature-img.jpg"
                            alt=""
                            fluid
                            className="pt-4"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Feature;