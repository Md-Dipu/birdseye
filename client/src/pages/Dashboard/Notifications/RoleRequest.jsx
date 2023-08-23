import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { updateUserById } from '../../../api/usersAPI';

const RoleRequest = ({ data, onClose }) => {
    const handleRoleRequest = () =>
        updateUserById(data.requestData.userId, { role: data.requestData.role })
            .catch(error => console.warn(error.message))
            .finally(() => onClose());

    return (
        <Card className="bg-white border-0 shadow position-fixed top-50 start-50 translate-middle" style={{ zIndex: 10, minWidth: '18rem' }}>
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">User: {data.requestData.userId}</Card.Subtitle>
                <Card.Text>{data.message}</Card.Text>
                <Card.Link as={Button} size="sm" variant="secondary" onClick={onClose}>Close</Card.Link>
                <Card.Link as={Button} size="sm" variant="success" onClick={handleRoleRequest}>Approve</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default RoleRequest;