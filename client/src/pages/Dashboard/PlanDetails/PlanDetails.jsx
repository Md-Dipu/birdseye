import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPlanById } from '../../../api/plansAPI';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading';
import DangerZone from './DangerZone';
import Description from './Description';
import DiscountDetails from './DiscountDetails';
import GeneralDetails from './GeneralDetails';
import ManagerDisplay from './ManagerDisplay';
import PlanBookings from './PlanBookings';
import PlanReviews from './PlanReviews';

const PlanDetails = () => {
    const [plan, setPlan] = useState({});
    const [updated, setUpdated] = useState(0);
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

    const handleUpdate = () => setUpdated(updated + 1);

    useEffect(() => {
        getPlanById(planId)
            .then(res => setPlan(res.data.data.value))
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, [planId, updated]);

    const showRoute = () => {
        switch (query.get('show')) {
            case 'bookings':
                return <PlanBookings
                    planId={planId}
                    filter={query.get('filter')}
                />;

            case 'reviews':
                return <PlanReviews
                    planId={planId}
                    rating={plan.rating}
                />;

            default:
                return (
                    isLoading ? <Loading height="60" /> :
                        <>
                            <GeneralDetails onUpdate={handleUpdate} {...plan} />
                            <Description id={planId} description={plan.description} onUpdate={handleUpdate} />
                            <DiscountDetails id={planId} globalDiscount={plan.globalDiscount} promoCode={plan.promoCode} onUpdate={handleUpdate} />
                            {user.role === 'admin' && <>
                                <ManagerDisplay id={planId} manager={plan.manager} onUpdate={handleUpdate} />
                                <DangerZone id={planId} status={plan.status} onUpdate={handleUpdate} />
                            </>}
                        </>
                );
        }
    };

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ListGroup variant="flush" className="position-sticky top-0">
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