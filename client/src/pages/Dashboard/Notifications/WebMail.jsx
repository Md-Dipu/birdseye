import React from 'react';
import { Button, Card } from 'react-bootstrap';

const WebMail = ({ onClose, data }) => {
    return (
        <Card className="bg-white border-0 shadow position-fixed top-50 start-50 translate-middle" style={{ zIndex: 10, minWidth: '18rem' }}>
            <Card.Body>
                <Card.Title>{data.from.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{data.from.email}</Card.Subtitle>
                <Card.Text>{data.message}</Card.Text>
                <Card.Link as={Button} size="sm" variant="secondary" onClick={onClose}>Close</Card.Link>
                <Card.Link href={`mailto:${data.from.email}`}>Reply</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default WebMail;