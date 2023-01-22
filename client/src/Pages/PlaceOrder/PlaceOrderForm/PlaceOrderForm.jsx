import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { createBooking } from '../../../api/bookingsAPI';
import useAuth from '../../../hooks/useAuth';

const PlaceOrderForm = ({ onClose, ...data }) => {
    const [quantity, setQuantity] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [payableAmount, setPayableAmount] = useState(0);

    const promoCodeRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        if (data.globalDiscount) {
            setDiscount(data.globalDiscount);
        }
    }, [data.globalDiscount]);

    useEffect(() => {
        if (data) {
            const total = data.price * quantity;
            setPayableAmount(total - total * (discount / 100));
        }
    }, [data, discount, quantity]);

    const onSubmit = (e) => {
        e.preventDefault();
        createBooking({
            planId: data._id,
            planName: data.name,
            coverImageURL: data.coverImageURL,
            price: data.price,
            quantity,
            payableAmount: payableAmount,
            discount: discount,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber
            }
        }).catch(console.warn).finally(onClose);
    };

    const addDiscount = () => {
        if (promoCodeRef.current.value === data.promoCode[0]) {
            promoCodeRef.current.value = '';
            setDiscount((data.globalDiscount || 0) + data.promoCode[1]);
        } else {
            promoCodeRef.current.focus();
        }
    };

    return (
        <Form onSubmit={onSubmit} className="bg-white border p-3 shadow position-fixed top-50 start-50 translate-middle" style={{ width: 300 }}>
            <Form.Text className="fs-6 fw-bold d-block">{data.name}</Form.Text>
            <Form.Text className="d-block">On {new Date(data.startingDate).toDateString()} | {data.tourDays} Days</Form.Text>
            <Form.Text className="d-block">Price: ${data.price}</Form.Text>
            {discount ? <Form.Text className="d-block">Discount: {discount}%</Form.Text> : null}
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
                    <Form.Control type="text" placeholder="Promo code" ref={promoCodeRef} />
                    <Button onClick={addDiscount}>Add</Button>
                </InputGroup>
            </>}
            <hr />

            <div className="bg-light p-3 rounded border text-center mb-3">
                <div className="h3">${payableAmount.toFixed(2)}</div>
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