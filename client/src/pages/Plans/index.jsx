import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { backToTop } from '../../utilities/utilities';
import { getPlans } from '../../api/plansAPI';
import Pagination from '../Shared/Pagination';
import Loading from '../Shared/Loading';
import Plan from './Plan';
import Search from './Search';

const Plans = () => {
    const [totalPlans, setTotalPlans] = useState(0);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);

    const limit = 12;

    useEffect(() => {
        let text = '';
        if (query.get('search')) {
            text += `&$text[$search]=${query.get('search')}`;
        }
        if (query.get('sort')) {
            text += `&sort=${query.get('sort')}`;
        }

        getPlans(`?status=active&limit=${limit}&page=${query.get('page') || 1}&fields=name,shortDescription,coverImageURL,price,rating,tourDays,startingDate${text}`)
            .then(res => {
                setTotalPlans(res.data.count);
                setPlans(res.data.data);
                backToTop();
            })
            .catch(error => console.warn(error))
            .then(() => setLoading(false));
    }, [query]);

    if (loading) {
        return <Loading height="80" />;
    }

    return (
        <Container>
            <Search text={query.get('search')} />
            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {plans.map(plan => (
                    <Col key={plan._id}>
                        <Plan {...plan} />
                    </Col>
                ))}
            </Row>
            {limit < totalPlans && <Pagination
                currentPage={parseInt(query.get('page')) || 1}
                numberOfButtons={Math.ceil(totalPlans / limit)}
                onClick={page => {
                    setLoading(true);
                    query.set('page', page);
                    history.replace(`?${query.toString()}`);
                }}
            />}
        </Container>
    );
};

export default Plans;