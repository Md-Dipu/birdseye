import React, { useEffect, useState } from 'react';
import { getNotificationById } from '../../../api/notificationsAPI';
import WebMail from './WebMail';
import RoleRequest from './RoleRequest';
import { Button, Card } from 'react-bootstrap';

export const DetailsModal = ({ id, onClose }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            getNotificationById(id).then(({ data: res }) => {
                setData(res.data);
            });
        } else {
            setData(null);
        }
    }, [id]);

    if (data?.type === 'web-mail') {
        return <WebMail
            onClose={onClose}
            data={data}
        />;
    } else if (data?.type === 'role-request') {
        return <RoleRequest
            onClose={onClose}
            data={data}
        />;
    }

    return (
        data ? <Card className="bg-white border-0 shadow position-fixed top-50 start-50 translate-middle" style={{ zIndex: 10, minWidth: '18rem' }}>
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.message}</Card.Text>
                <Card.Link as={Button} size="sm" variant="secondary" onClick={onClose}>Close</Card.Link>
            </Card.Body>
        </Card> : null
    );
};