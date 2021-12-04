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
        axios.get(`https://intense-cliffs-52842.herokuapp.com/users/${user.email}`)
            .then(res => setOrderedList(res?.data?.ordered))
            .catch(error => console.warn(error))
            .then(() => setIsLoading(false));
    }, [user]);

    if (isLoading) {
        return <Loading height="60" />;
    }

    return (
        <Container>
            <Row className="justify-content-center my-3">
                <Col xs={12} md={8} lg={6} style={{ minHeight: '60vh' }}>
                    <h4 className="text-uppercase text-center">your <span className="text-info">orders</span></h4>
                    {(orderedItems.length === 0) ? 
                        <div>
                            <h3 className="text-uppercase text-center">no order found</h3>
                        </div>
                        
                        : orderedItems.map((planId, _idx) => <MyOrder 
                            key={_idx} 
                            user={user}
                            planId={planId} 
                            orderedList={orderedList}
                            setObserveCancel={setObserveCancel}
                        />)
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default MyOrders;