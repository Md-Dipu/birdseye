import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { getNotifications } from '../../../api/notificationsAPI';
import Loading from '../../Shared/Loading';
import Notification from './Notification';

const Notifications = () => {
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        getNotifications()
            .then(({ data: res }) => {
                setCount(res.count);
                setNotifications(res.data.reverse());
            });
    }, []);

    if (!notifications) {
        return (
            <>
                <Helmet title="Notifications" />
                <Loading height="70" />
            </>
        );
    }

    return (
        <Container className="my-3" style={{ minHeight: "60vh" }}>
            <Helmet title="Notifications" />
            <div className="h3 text-secondary">Notifications</div>
            {count ? (
                <Row xs={1}>
                    {notifications.map(notification => <Col>
                        <Notification {...notification} />
                    </Col>)}
                </Row>
            ) : <div className="text-secondary">No notifications found</div>}
        </Container>
    );
};

export default Notifications;