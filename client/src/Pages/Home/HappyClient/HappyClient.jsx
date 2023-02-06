import React, { useEffect, useReducer } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { getPlans } from '../../../api/plansAPI';
import { getReviews } from '../../../api/reviewsAPI';
import { getUsers } from '../../../api/usersAPI';

const reducer = (state, action) => {
    switch (action.type) {
        case 'set-plans-count':
            return { ...state, totalTips: action.value };

        case 'set-users-count':
            return { ...state, users: action.value };

        case 'set-high-rated-reviews-count':
            return { ...state, highRatedSiteReviews: action.value };

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

                dispatch({
                    type: 'set-high-rated-reviews-count',
                    value: (await getReviews('?to=site&rating[gte]=3&fields=_id')).data.count
                });

                dispatch({
                    type: 'set-high-5-views',
                    value: (await getReviews('?to=site&rating[gte]=3&sort=-rating&limit=5&fields=message,user.name')).data.data
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
                <Col className="shadow rounded d-flex" style={{ minHeight: 250 }}>
                    <Carousel variant="dark" controls={false} className="p-3 text-start w-100">
                        {state.high5Reviews.map((review) => <Carousel.Item key={review._id}>
                            <div className="h5">{review.user.name}</div>
                            <blockquote className="fst-italic text-secondary fs-6">"{review.message}"</blockquote>
                        </Carousel.Item>)}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
};

export default HappyClient;