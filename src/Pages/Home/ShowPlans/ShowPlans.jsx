import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Plan from '../../Shared/Plan/Plan';
import Loading from '../../Shared/Loading/Loading';

const ShowPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://intense-cliffs-52842.herokuapp.com/plans?limit=6')
            .then(res => {
                setPlans(res.data.plans);
            })
            .catch(error => console.warn(error))
            .then(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading height="60" />;
    }

    return (
        <Container>
            <h3 className="text-center text-uppercase mt-3">our plans</h3>
            <Row xs={1} md={2} lg={3} className="g-4 my-3">
                {plans.map(plan => (
                    <Col key={plan._id}>
                        <Plan plan={plan} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ShowPlans;