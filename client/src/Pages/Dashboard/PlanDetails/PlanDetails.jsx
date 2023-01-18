import React, { useMemo } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PlanBookings from './PlanBookings';

const PlanDetails = () => {
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

    const showRoute = () => {
        switch (query.get('show')) {
            case 'bookings':
                return <PlanBookings
                    planId={planId}
                    filter={query.get('filter')}
                />;

            default:
                return <div>Hello from details</div>
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