import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import Plan from '../Plan/Plan';
import Loading from '../Shared/Loading/Loading';

const Plans = () => {
    const [totalPlans, setTotalPlans] = useState(0);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    
    const limit = 1;
    useEffect(() => {
        axios.get(`https://calm-tor-26955.herokuapp.com/plans?limit=${limit}&&page=${currentPage}`)
            .then(res => {
                setTotalPlans(res.data.count);
                setPlans(res.data.plans);
            })
            .catch(error => console.warn(error))
            .then(() => setLoading(false));
    }, [currentPage]);

    if (loading) {
        return <Loading height="80" />;
    }

    return (
        <Container>
            <h3 className="text-center text-uppercase my-3">our all plans</h3>
            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {plans.map(plan => (
                    <Col key={plan.key}>
                        <Plan plan={plan} />
                    </Col>
                ))}
            </Row>
            {limit < totalPlans && <div className="text-center my-3">
                <ButtonGroup className="text-center">
                    {[...Array(Math.ceil(totalPlans/limit)).keys()]
                    .map(page => (
                        <Button 
                            key={page}
                            variant={page === currentPage ? 'primary' : 'outline-primary'}
                            onClick={() => setCurrentPage(page)}
                        >{page+1}</Button>
                    ))}
                </ButtonGroup>
            </div>}
        </Container>
    );
};

export default Plans;