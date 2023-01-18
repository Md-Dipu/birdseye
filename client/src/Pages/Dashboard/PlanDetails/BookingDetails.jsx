import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Form } from 'react-bootstrap';
import { approveBookingCancelRequest, getBookingById } from '../../../api/bookingsAPI';

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

    const handleApproveCancelation = () => {
        approveBookingCancelRequest(id)
            .then(onClose).catch(console.warn);
    };

    return (
        <Card className="bg-white shadow position-fixed top-50 start-50 translate-middle" style={{ width: '18rem' }}>
            <Card.Body>
                <Form>
                    <Form.Text className="text-decoration-none text-secondary fs-6 fw-bold d-block">{data.user?.name}</Form.Text>
                    <Form.Text className="d-block">Quantity: {data.quantity}</Form.Text>
                    {data.discount && <Form.Text className="d-block">Discount: {data.discount}%</Form.Text>}
                    <Form.Text className="d-block">Total amount: ${data.totalAmount?.toFixed(2)}</Form.Text>
                    <Form.Text className="d-block fw-bold">Payable amount: <span className="text-danger">${data.payableAmount?.toFixed(2)}</span></Form.Text>
                    {data.payment && <Form.Text className="d-block fw-bold">Payable amount: <span className="text-success">${data.payment?.amount.toFixed(2)}</span></Form.Text>}

                    {data.cancelation && !data.cancelation?.requestApproved && <Button variant="warning" size="sm" className="mt-3" onClick={handleApproveCancelation}>Approve Cancelation</Button>}{" "}
                    <Button variant="outline-secondary" size="sm" className="mt-3" onClick={onClose}>Close</Button>
                </Form>
            </Card.Body>
            <div className="position-absolute top-0 end-0">
                {data.cancelation?.requestApproved && <Badge pill bg="danger" className="me-1">
                    Canceled
                </Badge>}
                {data.paid && <Badge pill bg="success" className="me-1">
                    Paid
                </Badge>}
                {data.cancelation && !data.cancelation?.requestApproved && <Badge pill bg="warning" className="me-1">
                    Cancel request pending
                </Badge>}
            </div>
        </Card>
    );
};

export default BookingDetails;