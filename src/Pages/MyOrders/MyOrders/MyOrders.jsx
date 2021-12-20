import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { APIUrl } from '../../../utilities/API';
import { backToTop } from '../../../utilities/utilities';
import Loading from '../../Shared/Loading/Loading';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
    const [orderedList, setOrderedList] = useState({});
    const [observeCancel, setObserveCancel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const history = useHistory();
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }

    const orderedItems = Object.keys(orderedList || {});

    useEffect(() => {
        axios.get(APIUrl(`/users/${user.email}`), {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => setOrderedList(res?.data?.ordered))
            .catch(error => {
                if (error.response.status === 401)
                    history.push('/login');
                else
                    console.warn(error);
            })
            .then(() => setIsLoading(false));
    }, [user]);

    useEffect(() => {
        if (observeCancel) {
            const tepmList = orderedList;
            delete tepmList[observeCancel];
            setOrderedList({ ...tepmList });
        }
    }, [observeCancel]);

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
                            <h3 className="text-uppercase text-center text-danger">no order found</h3>
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