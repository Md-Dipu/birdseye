import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { getBookingDB } from '../../../utilities/API';
import { backToTop } from '../../../utilities/utilities';
import Loading from '../../Shared/Loading/Loading';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
    const [orderedList, setOrderedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();
    const history = useHistory();
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }

    useEffect(() => {
        getBookingDB({ email: user.email })
            .then(res => setOrderedList(res.data.results))
            .catch(error => {
                if (error?.response?.status === 401)
                    history.push('/login');
                else
                    console.warn(error);
            })
            .then(() => setIsLoading(false));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return <Loading height="60" />;
    }

    return (
        <Container>
            <Row className="justify-content-center my-3">
                <Col xs={12} md={8} lg={6} style={{ minHeight: '60vh' }}>
                    <h4 className="text-uppercase text-center">your <span className="text-info">orders</span></h4>
                    {(orderedList.length === 0) ?
                        <div>
                            <h3 className="text-uppercase text-center text-danger">no order found</h3>
                        </div>

                        : orderedList.map((bookingData) => <MyOrder
                            key={bookingData._id}
                            bookingData={bookingData}
                            bookingCanceled={() => {
                                const restBookings = orderedList.filter(x => x._id !== bookingData._id);
                                setOrderedList(restBookings);
                            }}
                        />)
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default MyOrders;