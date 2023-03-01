import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getBookings } from '../../../api/bookingsAPI';
import Loading from '../../Shared/Loading';
import useAuth from '../../../hooks/useAuth';
import Booking from './Booking';
import SideBanner from './SideBanner';
import Pagination from '../../Shared/Pagination';
import BookingDetails from './BookingDetails';

const Bookings = () => {
    const [data, setDate] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showBookingId, setShowBookingId] = useState(null);

    const { user } = useAuth();
    const limit = 12;

    useEffect(() => {
        getBookings(`?user.userId=${user._id}&limit=${limit}&page=${currentPage}&cancelation.requestApproved[$exists]=false&fields=planId,planName,coverImageURL,quantity,payableAmount`)
            .then(res => {
                setDate(res.data.data);
                setTotalData(res.data.count);
            })
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, [user, currentPage]);

    if (isLoading) {
        <Loading height="60" />
    }

    return (
        <Container>
            <Row>
                <Col xs="12" md="8" className="mt-3">
                    <div className="h5 text-uppercase">All bookings</div>
                    <div className="d-flex flex-wrap justify-content-between">
                        {data.map(booking => <Booking
                            key={booking._id}
                            onClick={() => setShowBookingId(booking._id)}
                            {...booking}
                        />)}
                    </div>
                    {showBookingId && <BookingDetails
                        id={showBookingId}
                        onClose={() => setShowBookingId(null)}
                    />}
                    {(totalData > limit) && <Pagination
                        numberOfButtons={Math.ceil(totalData / limit)}
                        currentPage={currentPage}
                        onClick={setCurrentPage}
                    />}
                </Col>
                <Col xs="12" md="4" className="mt-3">
                    <SideBanner />
                </Col>
            </Row>
        </Container>
    );
};

export default Bookings;