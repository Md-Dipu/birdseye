import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { getNotifications } from '../../../api/notificationsAPI';
import Loading from '../../Shared/Loading';
import Notification from './Notification';
import PaginationContainer from '../../Shared/Pagination';
import useAuth from '../../../hooks/useAuth';
import { DetailsModal } from './DetailsModal';

const Notifications = () => {
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState(null);

    const limit = 10;
    const { user } = useAuth();

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
                        {notifications?.map((notification, index) => <Col key={notification._id}>
                            <Notification
                                {...notification}
                                onClick={() => {
                                    setId(notification._id);
                                    notifications[index].seenBy.push(user._id);
                                }}
                            />
                        </Col>)}
                    </Row>
                    {count > limit && <PaginationContainer
                        currentPage={currentPage}
                        numberOfButtons={Math.ceil(count / limit)}
                        onClick={page => setCurrentPage(page)}
                    />}
                </>
            ) : <div className="text-secondary">No notifications found</div>}
            <DetailsModal id={id} onClose={() => setId(null)} />
        </Container>
    );
};

export default Notifications;