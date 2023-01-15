import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { createBooking } from '../../../api/bookingsAPI';
import useAuth from '../../../hooks/useAuth';

const PlaceOrderForm = ({ onClose, ...data }) => {
    const [quantity, setQuantity] = useState(1);

    const { user } = useAuth();
    const onSubmit = (e) => {
        e.preventDefault();
        createBooking({
            planId: data._id,
            planName: data.name,
            coverImageURL: data.coverImageURL,
            price: data.price,
            quantity,
            payableAmount: data.payable * quantity,
            discount: data.globalDiscount,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber
            }
        }).catch(console.warn).finally(onClose);
    };

    return (
        <Form onSubmit={onSubmit} className="bg-white border p-3 shadow position-absolute top-50 start-50 translate-middle" style={{ width: 300 }}>
            <Form.Text className="fs-6 fw-bold d-block">{data.name}</Form.Text>
            <Form.Text className="d-block">On {new Date(data.startingDate).toDateString()} | {data.tourDays} Days</Form.Text>
            <Form.Text className="d-block">Price: ${data.price}</Form.Text>
            {data.globalDiscount && <Form.Text className="d-block">Discount: {data.globalDiscount}%</Form.Text>}
            <hr />

            <Form.Text className="d-block fw-bold mb-2">Quantity</Form.Text>
            <InputGroup>
                <Button
                    variant="outline-secondary"
                    onClick={() => setQuantity((quantity - 1) > 0 ? quantity - 1 : 0)}
                >-</Button>
                <Form.Control
                    type="text"
                    value={quantity}
                    placeholder="Quantity"
                    onChange={e => {
                        const value = e.target.value;
                        if (isNaN(value)) return;
                        setQuantity(parseInt(value) || 0);
                    }}
                />
                <Button
                    variant="outline-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                >+</Button>
            </InputGroup>
            {data.promoCode && <>
                <Form.Text className="d-block fw-bold mb-2">Promo code</Form.Text>
                <InputGroup>
                    <Form.Control type="text" placeholder="Promo code" />
                    <Button>Add</Button>
                </InputGroup>
            </>}
            <hr />

            <div className="bg-light p-3 rounded border text-center mb-3">
                <div className="h3">${(data.payable * quantity).toFixed(2)}</div>
                <Form.Text>Total Payable</Form.Text>
            </div>

            <Button
                type="submit"
                variant="success"
                size="sm"
                className="rounded-0"
                disabled={!quantity}
            >
                Confirm
            </Button>{" "}
            <Button
                type="reset"
                variant="outline-secondary"
                size="sm"
                className="rounded-0"
                onClick={onClose}
            >
                Cancel
            </Button>
        </Form>
    );
};

export default PlaceOrderForm;