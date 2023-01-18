import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Form } from 'react-bootstrap';
import { approveBookingCancelRequest, deleteBookingById, getBookingById } from '../../../api/bookingsAPI';
import useAuth from '../../../hooks/useAuth';

const BookingDetails = ({ id, onClose, onDelete }) => {
    const [data, setData] = useState({});

    const { user } = useAuth()

    useEffect(() => {
        getBookingById(id)
            .then(res => {
                const data = res.data.data;
                data.totalAmount = data.price * data.quantity;
                data.discount = (data.totalAmount * (data.discount / 100));
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

    const handleDeleteBooking = () => {
        deleteBookingById(id)
            .then(() => {
                onDelete();
                onClose();
            }).catch(console.warn);
    };

    return (
        <Card className="bg-white shadow position-fixed top-50 start-50 translate-middle" style={{ width: '20rem', maxWidth: '98%' }}>
            <Card.Body>
                <Form>
                    <Form.Text className="text-decoration-none text-secondary fs-6 fw-bold d-block">{data.user?.name}</Form.Text>
                    <Form.Text className="d-block">Quantity: {data.quantity}</Form.Text>
                    {data.discount ? <Form.Text className="d-block">Discount: ${data.discount}</Form.Text> : null}
                    <Form.Text className="d-block">Total amount: ${data.totalAmount?.toFixed(2)}</Form.Text>
                    <Form.Text className="d-block fw-bold">Payable amount: <span className="text-danger">${data.payableAmount?.toFixed(2)}</span></Form.Text>
                    {data.payment && <Form.Text className="d-block fw-bold">Paid amount: <span className="text-success">${data.payment.amount.toFixed(2)}</span></Form.Text>}

                    {data.cancelation?.requestSended && <Button variant="warning" size="sm" className="mt-3" onClick={handleApproveCancelation}>Approve Cancelation</Button>}{" "}
                    {user.role === 'admin' && <Button variant="danger" size="sm" className="mt-3" onClick={handleDeleteBooking}>Delete</Button>}{" "}
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
                {data.cancelation?.requestSended && <Badge pill bg="warning" className="me-1">
                    Cancel request pending
                </Badge>}
            </div>
        </Card>
    );
};

export default BookingDetails;