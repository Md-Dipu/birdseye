import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
    const [orderedList, setOrderedList] = useState({});
    const [observeCancel, setObserveCancel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const orderedItems = Object.keys(orderedList);

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${user.email}`)
            .then(res => setOrderedList(res?.data?.ordered))
            .catch(error => console.warn(error))
            .then(() => setIsLoading(false));
    }, [user]);

    if (isLoading) {
        return <Loading height="80" />;
    }

    return (
        <Container>
            <Row className="justify-content-center my-3">
                <Col xs={12} md={8} lg={6}>
                    <h4 className="text-uppercase text-center">your <span className="text-info">orders</span></h4>
                    {orderedItems.map((planId, _idx) => <MyOrder 
                        key={_idx} 
                        user={user}
                        planId={planId} 
                        orderedList={orderedList}
                        observeCancel={observeCancel}
                        setObserveCancel={setObserveCancel}
                    />)}
                </Col>
            </Row>
        </Container>
    );
};

export default MyOrders;