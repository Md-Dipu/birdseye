import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getBookingById } from '../../../api/bookingsAPI';

const BookingDetails = ({ id, onClose }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        getBookingById(id)
            .then(res => {
                const data = res.data.data;
                data.totalAmount = data.price * data.quantity;
                data.payDisable = false;

                if (data.payment) {
                    data.payableAmount -= data.payment.amount;
                    if (data.payableAmount <= 0) {
                        data.payableAmount = 0;
                        data.payDisable = true;
                    }
                }

                return data;
            })
            .then(data => setData(data))
            .catch(console.warn);
    }, [id]);

    return (
        <Card className="bg-white shadow position-fixed top-50 start-50 translate-middle" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.coverImageURL} />
            <Card.Body>
                <Form>
                    <Form.Text as={Link} to={`/plans/${data.planId}`} className="text-decoration-none text-secondary fs-6 fw-bold d-block">{data.planName}</Form.Text>
                    <Form.Text className="d-block">Price: ${data.price}</Form.Text>
                    <Form.Text className="d-block">Quantity: {data.quantity}</Form.Text>
                    {data.discount && <Form.Text className="d-block">Discount: {data.discount}%</Form.Text>}
                    <Form.Text className="d-block">Total amount: ${data.totalAmount?.toFixed(2)}</Form.Text>
                    <Form.Text className="d-block fw-bold">Payable amount: <span className="text-success">${data.payableAmount?.toFixed(2)}</span></Form.Text>

                    <Button variant="success" size="sm" className="mt-3" disabled={data.payDisable}>Pay</Button>{" "}
                    <Button variant="warning" size="sm" className="mt-3" disabled={data.cancelation}>Cancel</Button>{" "}
                    <Button variant="outline-secondary" size="sm" className="mt-3" onClick={onClose}>Close</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default BookingDetails;