import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const Notification = props => {
    const { user } = useAuth();
    const isSeen = Boolean(props.seenBy.find(id => id === user._id));

    return (
        <Card className="my-1 p-3 rounded-0" style={{ borderLeft: `2px var(${isSeen ? '--bs-success' : '--bs-danger'}) solid` }}>
            <Card.Subtitle className="fw-semibold text-secondary">{props.title || props.from.name} {!isSeen && <Badge pill bg="warning">New</Badge>}</Card.Subtitle>
            <Card.Text className={`${isSeen ? '' : 'fw-semibold'} text-secondary text-truncate`}>{props.message}</Card.Text>
        </Card>
    );
};

export default Notification;