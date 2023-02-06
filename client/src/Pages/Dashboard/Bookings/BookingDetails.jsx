import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getBookingById, sendBookingCancelRequest } from '../../../api/bookingsAPI';

const BookingDetails = ({ id, onClose }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        getBookingById(id)
            .then(res => {
                const data = res.data.data;
                data.totalAmount = data.price * data.quantity;
                data.paid = false;

                if (data.payment) {
                    data.payableAmount -= data.payment.amount;
                    if (data.payableAmount <= 0) {
                        data.payableAmount = 0;
                        data.paid = true;
                    }
                }

                return data;
            })
            .then(data => setData(data))
            .catch(console.warn);
    }, [id]);

    const handleCancelation = () => {
        sendBookingCancelRequest(id)
            .then(onClose).catch(console.warn);
    };

    return (
        <Card className="bg-white shadow position-fixed top-50 start-50 translate-middle" style={{ width: '18rem', zIndex: 1 }}>
            <Card.Img variant="top" src={data.coverImageURL} />
            <Card.Body>
                <Form>
                    <Form.Text as={Link} to={`/plans/${data.planId}`} className="text-decoration-none text-secondary fs-6 fw-bold d-block">{data.planName}</Form.Text>
                    <Form.Text className="d-block">Price: ${data.price}</Form.Text>
                    <Form.Text className="d-block">Quantity: {data.quantity}</Form.Text>
                    {data.discount && <Form.Text className="d-block">Discount: {data.discount}%</Form.Text>}
                    <Form.Text className="d-block">Total amount: ${data.totalAmount?.toFixed(2)}</Form.Text>
                    <Form.Text className="d-block fw-bold">Payable amount: <span className="text-success">${data.payableAmount?.toFixed(2)}</span></Form.Text>

                    <Button variant="success" size="sm" className="mt-3" disabled={data.paid}>Pay</Button>{" "}
                    <Button variant="warning" size="sm" className="mt-3" disabled={data.cancelation} onClick={handleCancelation}>Cancel</Button>{" "}
                    <Button variant="outline-secondary" size="sm" className="mt-3" onClick={onClose}>Close</Button>
                </Form>
            </Card.Body>
            <div className="position-absolute top-0 end-0">
                {data.paid && <Badge pill bg="success" className="me-1">
                    Paid
                </Badge>}
                {data.cancelation && <Badge pill bg="warning" className="me-1">
                    Cancel request pending
                </Badge>}
            </div>
        </Card>
    );
};

export default BookingDetails;