import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getPlans } from '../../../api/plansAPI';
import Plan from '../../Plans/Plan';
import Loading from '../../Shared/Loading';

const ShowPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPlans('?status=active&sort=-views&limit=6&fields=name,shortDescription,coverImageURL,price,rating,tourDays,startingDate')
            .then(res => {
                setPlans(res.data.data);
            })
            .catch(error => console.warn(error))
            .then(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading height="60" />;
    }

    return (
        <Container>
            <h3 className="text-center text-uppercase my-3"><span className="text-info">popular</span> plans</h3>
            <Row xs={1} md={2} lg={3} className="g-4 mb-3">
                {plans.map(plan => (
                    <Col key={plan._id}>
                        <Plan {...plan} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ShowPlans;