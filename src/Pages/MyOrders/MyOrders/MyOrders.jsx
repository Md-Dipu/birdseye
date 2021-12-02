import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
    const [orderedList, setOrderedList] = useState({});
    const [isCanceled, setIsCanceled] = useState(false);
    const { user } = useAuth();

    const orderedItems = Object.keys(orderedList);

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${user.email}`)
            .then(res => setOrderedList(res?.data?.ordered))
            .catch(error => console.warn(error));
    }, [user, isCanceled]);

    return (
        <Row className="justify-content-center my-3">
            <Col xs={12} md={8} lg={6}>
                <h4 className="text-uppercase text-center">your <span className="text-info">orders</span></h4>
                {orderedItems.map((planId, _idx) => <MyOrder 
                    key={_idx} 
                    user={user}
                    planId={planId} 
                    orderedList={orderedList}
                    setIsCanceled={setIsCanceled}
                />)}
            </Col>
        </Row>
    );
};

export default MyOrders;