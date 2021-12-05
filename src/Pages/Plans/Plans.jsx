import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { backToTop } from '../../utilities/utilities';
import Plan from '../Shared/Plan/Plan';
import Loading from '../Shared/Loading/Loading';

const Plans = () => {
    const [totalPlans, setTotalPlans] = useState(0);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    // pagination
    const history = useHistory();
    const location = useLocation();
    const searchQueary = new URLSearchParams(location.search);
    const currentPage = (parseInt(searchQueary.get('page')) - 1) || 0;
    const setCurrentPage = pageNumber => {
        searchQueary.set('page', String(pageNumber + 1));
        location.search = searchQueary.toString();
        history.push(location);
    };

    // backtotop
    if (!location.hash) {
        backToTop();
    }
    
    // plan per page
    const limit = 9;
    useEffect(() => {
        axios.get(`https://intense-cliffs-52842.herokuapp.com/plans?limit=${limit}&&page=${currentPage}`)
            .then(res => {
                setTotalPlans(res.data.count);
                setPlans(res.data.plans);
                backToTop();
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
                    <Col key={plan._id}>
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