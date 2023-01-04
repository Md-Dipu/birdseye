import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { backToTop } from '../../utilities/utilities';
import { getPlans } from '../../api/plansAPI';
import Pagination from '../Shared/Pagination/Pagination';
import Loading from '../Shared/Loading/Loading';
import Plan from '../Shared/Plan/Plan';

const Plans = () => {
    const [totalPlans, setTotalPlans] = useState(0);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 12;

    useEffect(() => {
        getPlans(`?status=active&limit=${limit}&page=${currentPage}&fields=name,shortDescription,coverImageURL,price,rating,tourDays,startingDate`)
            .then(res => {
                setTotalPlans(res.data.count);
                setPlans(res.data.data);
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
            <h3 className="text-center text-uppercase my-3">our all <span className="text-info">plans</span></h3>
            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {plans.map(plan => (
                    <Col key={plan._id}>
                        <Plan {...plan} />
                    </Col>
                ))}
            </Row>
            {limit < totalPlans && <div className="text-center my-3">
                <Pagination
                    currentPage={currentPage}
                    numberOfButtons={Math.ceil(totalPlans / limit)}
                    changePage={page => {
                        setLoading(true);
                        setCurrentPage(page);
                    }}
                />
            </div>}
        </Container>
    );
};

export default Plans;