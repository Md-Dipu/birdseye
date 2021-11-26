import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';

const PlanDetails = () => {
    const [plan, setPlan] = useState({});
    const { planId } = useParams();

    const { title, description, img_url, rating, tourDays, cost, starting_date } = plan;

    useEffect(() => {
        axios.get(`http://localhost:5000/plans/${planId}`)
        .then(res => setPlan(res.data))
        .catch(error => console.warn(error));
    }, [planId]);
    
    return (
        <Container>
            <Row xs={1} lg={2} className="my-3">
                <Col>
                    <Card className="border-0">
                        <Card.Img variant="top" src={img_url} />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlanDetails;