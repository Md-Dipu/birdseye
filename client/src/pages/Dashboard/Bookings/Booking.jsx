import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Booking.css';

const Booking = (props) => {
    return (
        <Card className="mb-3 overflow-hidden be-booking-card">
            <Card.Body className="p-2">
                <div className="d-flex">
                    <img
                        src={props.coverImageURL}
                        width="150"
                        className="rounded"
                        alt=""
                    />
                    <div className="ms-3">
                        <Card.Subtitle as={Link} to={`/plans/${props.planId}`} className="text-decoration-none text-secondary fw-bold">{props.planName}</Card.Subtitle>
                        <Card.Subtitle className="text-secondary">Cost: ${props.payableAmount.toFixed(2)}</Card.Subtitle>
                        <Card.Subtitle className="text-secondary">Quantity: {props.quantity}</Card.Subtitle>
                        <Button variant="link" size="sm" className="px-0" onClick={props.onClick}>View details</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Booking;