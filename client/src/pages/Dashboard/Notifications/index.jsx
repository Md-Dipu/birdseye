import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { getNotifications } from '../../../api/notificationsAPI';
import Loading from '../../Shared/Loading';
import Notification from './Notification';
import PaginationContainer from '../../Shared/Pagination';

const Notifications = () => {
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const limit = 10;

    useEffect(() => {
        setIsLoading(true);
        getNotifications(`?sort=-createdAt&limit=${limit}&page=${currentPage}&fields=title,message,from.name,seenBy`)
            .then(({ data: res }) => {
                setCount(res.count);
                setNotifications(res.data);
                setIsLoading(false);
            });
    }, [currentPage]);

    if (isLoading) {
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
                <>
                    <Row xs={1}>
                        {notifications.map(notification => <Col key={notification._id}>
                            <Notification {...notification} />
                        </Col>)}
                    </Row>
                    {count > limit && <PaginationContainer
                        currentPage={currentPage}
                        numberOfButtons={Math.ceil(count / limit)}
                        onClick={page => setCurrentPage(page)}
                    />}
                </>
            ) : <div className="text-secondary">No notifications found</div>}
        </Container>
    );
};

export default Notifications;