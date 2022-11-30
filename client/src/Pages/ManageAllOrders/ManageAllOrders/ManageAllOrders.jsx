import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { getBookingDB } from '../../../utilities/API';
import { backToTop } from '../../../utilities/utilities';
import Loading from '../../Shared/Loading/Loading';
import ManageOrder from '../ManageOrder/ManageOrder';

const ManageAllOrders = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }

    useEffect(() => {
        getBookingDB({})
            .then(({ data: { results } }) => setAllBookings(results))
            .catch(console.warn)
            .then(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <Loading height="60" />;
    }

    return (
        <Container>
            <Row className="justify-content-center my-3">
                <Col xs={12} md={8} lg={6} style={{ minHeight: '60vh' }}>
                    <h4 className="text-uppercase text-center"><span className="text-info">manage</span> all orders</h4>
                    {(allBookings.length === 0) ?
                        <div>
                            <h3 className="text-uppercase text-center text-danger">no order found</h3>
                        </div>
                        : allBookings.map(booking => <ManageOrder
                            key={booking._id}
                            bookingData={booking}
                            deletedBooking={() => {
                                const restbooking = allBookings.filter(x => x._id !== booking._id);
                                setAllBookings(restbooking);
                            }}
                        />)
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default ManageAllOrders;