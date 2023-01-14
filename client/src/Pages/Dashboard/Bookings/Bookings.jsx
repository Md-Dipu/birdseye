import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getBookings } from '../../../api/bookingsAPI';
import Loading from '../../Shared/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import Booking from './Booking';
import SideBanner from './SideBanner';

const Bookings = () => {
    const [data, setDate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        getBookings(`?user.userId=${user._id}`)
            .then(res => setDate(res.data.data))
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, [user]);

    if (isLoading) {
        <Loading height="60" />
    }

    return (
        <Container>
            <Row>
                <Col xs="12" md="8" className="mt-3 d-flex flex-wrap justify-content-between">
                    {data.map(booking => <Booking key={booking._id} {...booking} />)}
                </Col>
                <Col xs="12" md="4" className="mt-3">
                    <SideBanner />
                </Col>
            </Row>
        </Container>
    );
};

export default Bookings;