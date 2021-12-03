import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ManageOrder from '../ManageOrder/ManageOrder';

const ManageAllOrders = () => {
    const [users, setUsers] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [observeDelete, setObserveDelete] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => setUsers(res.data))
            .catch(error => console.warn(error));
    }, []);

    useEffect(() => {
        let orders = [];
        users.forEach(user => {
            let userOrders = [];
            for (const orderId in user.ordered) {
                const order = user.ordered[orderId];
                order.id = orderId;
                order.from = user.email;
                userOrders = [...userOrders, order];
            }
            orders = [...orders, ...userOrders];
        });
        setAllOrders(orders);
    }, [users]);

    useEffect(() => {
        if (observeDelete) {
            const restOrders = allOrders.filter(order => order.id !== observeDelete);
            setAllOrders([...restOrders])
        }
    }, [observeDelete, allOrders]);

    return (
        <Container>
            <Row className="justify-content-center my-3">
                <Col xs={12} md={8} lg={6}>
                    <h4 className="text-uppercase text-center"><span className="text-info">manage</span> all orders</h4>
                    {allOrders.map((order, _idx) => <ManageOrder 
                        key={_idx}
                        order={order}
                        user={users.find(user => user.email === order.from)}
                        setObserveDelete={setObserveDelete}
                    />)}
                </Col>
            </Row>
        </Container>
    );
};

export default ManageAllOrders;