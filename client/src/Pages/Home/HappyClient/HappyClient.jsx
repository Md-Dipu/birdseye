import React, { useEffect, useReducer } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { getPlans } from '../../../api/plansAPI';
import { getUsers } from '../../../api/usersAPI';

const reducer = (state, action) => {
    switch (action.type) {
        case 'set-plans-count':
            return { ...state, totalTips: action.value };

        case 'set-users-count':
            return { ...state, users: action.value };

        case 'set-high-rated-reviews-count':
            return { ...state, highRatedReviews: action.value };

        case 'set-high-5-views':
            return { ...state, high5Reviews: action.value };

        default:
            return state;
    }
};

const HappyClient = () => {
    const [state, dispatch] = useReducer(reducer, {
        totalTips: 0,
        users: 0,
        highRatedSiteReviews: 0,
        high5Reviews: []
    });

    useEffect(() => {
        (async () => {
            try {
                dispatch({
                    type: 'set-plans-count',
                    value: (await getPlans('?fields=_id')).data.count
                });

                dispatch({
                    type: 'set-users-count',
                    value: (await getUsers('?role=user&fields=_id')).data.count
                });

            } catch (error) {
                console.warn(error.message)
            }
        })();
    }, []);

    return (
        <Container className="my-4">
            <h4 className="text-center text-uppercase my-3">happy <span className="text-info">client</span></h4>
            <Row xs={1} md={2} className="g-3">
                <Col>
                    <Container>
                        <Row xs={1} className="gy-3">
                            {[
                                { title: 'total tips', value: state.totalTips },
                                { title: 'customers', value: state.users },
                                { title: 'happy client', value: state.highRatedSiteReviews }
                            ].map((item, _idx) => <Col key={_idx} className="rounded shadow text-center py-3">
                                <span className="text-uppercase">{item.title}</span><br />
                                <span className="fs-2">{item.value}</span>
                            </Col>)}
                        </Row>
                    </Container>
                </Col>
                <Col className="shadow rounded d-flex">
                    <Carousel variant="dark" controls={false} className="p-3 text-center">
                        {state.high5Reviews.map((quote, _idx) => <Carousel.Item key={_idx}>
                            <h4>{quote.clientName}</h4>
                            <blockquote className="fst-italic fs-5">"{quote.quote}"</blockquote>
                        </Carousel.Item>)}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
};

export default HappyClient;