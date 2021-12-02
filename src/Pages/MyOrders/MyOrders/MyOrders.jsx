import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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
        <Container className="my-3">
            <h4 className="text-uppercase text-center">your orders</h4>
            {orderedItems.map((planId, _idx) => <MyOrder 
                key={_idx} 
                planId={planId} 
                orderDetails={orderedList[planId]} 
                orderedList={orderedList}
                user={user}
                setIsCanceled={setIsCanceled}
            />)}
        </Container>
    );
};

export default MyOrders;