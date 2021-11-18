import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Plan from '../Plan/Plan';

const Plans = () => {
    const [totalPlans, setTotalPlans] = useState(0);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/plans')
            .then(res => {
                setTotalPlans(res.data.count);
                setPlans(res.data.plans);
            })
            .catch(error => console.warn(error))
            .then(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border"  variant="success" />
            </div>
        );
    }

    return (
        <Container>
            <h3 className="text-center text-uppercase my-3">our all plans {totalPlans}</h3>
            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {plans.map(plan => (
                    <Col key={plan.key}>
                        <Plan plan={plan} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Plans;