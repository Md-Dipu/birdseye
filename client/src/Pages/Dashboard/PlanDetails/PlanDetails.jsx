import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPlanById } from '../../../api/plansAPI';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';
import PlanBookings from './PlanBookings';

const PlanDetails = () => {
    const [plan, setPlan] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();
    const { planId } = useParams();
    const history = useHistory();
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);

    const handleDetailsLinks = () => history.replace('?');

    const handleBookingLinks = (filter) => () => {
        query.set('show', 'bookings');
        filter ? query.set('filter', filter) : query.delete('filter');
        history.replace(`?${query.toString()}`);
    };

    const handleReviewsLinks = () => {
        query.delete('filter');
        query.set('show', 'reviews');
        history.replace(`?${query.toString()}`);
    };

    useEffect(() => {
        setIsLoading(true);
        getPlanById(planId)
            .then(res => setPlan(res.data.data.value))
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, [planId]);

    const showRoute = () => {
        switch (query.get('show')) {
            case 'bookings':
                return <PlanBookings
                    planId={planId}
                    filter={query.get('filter')}
                />;

            default:
                return (
                    isLoading ? <Loading height="60" /> :
                        <div className="my-3">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div className="h5 text-secondary">General</div>
                                    {user.role === 'admin' && <Button variant="link">Edit</Button>}
                                </div>
                                <table>
                                    {[
                                        ['Name', plan.name],
                                        ['Short Description', plan.shortDescription],
                                        ['Price', `$${plan.price}`],
                                        ['Tour days', `${plan.tourDays} Days`],
                                        ['Starting date', new Date(plan.startingDate).toDateString().replace(' ', ', ')]
                                    ].map(item => <tr>
                                        <th className="text-nowrap pe-3" style={{ verticalAlign: 'baseline' }}>{item[0]}:</th>
                                        <td>{item[1]}</td>
                                    </tr>)}
                                </table>
                            </div>
                        </div>
                );
        }
    };

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ListGroup variant="flush">
                        <ListGroup.Item action onClick={handleDetailsLinks}>Plan details</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks()}>Bookings</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks('cancelation')}>Cancel requests</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks('canceled')}>Canceled</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks('paid')}>Paid</ListGroup.Item>
                        <ListGroup.Item action onClick={handleReviewsLinks}>Reviews</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    {showRoute()}
                </Col>
            </Row>
        </Container>
    );
};

export default PlanDetails;