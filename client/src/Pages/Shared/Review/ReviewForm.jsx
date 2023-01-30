import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Stars from './Stars';

const ReviewForm = ({ onSubmit, onCancel }) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        if (!rating) return;
        onSubmit({ rating, message });
    };

    return (
        <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '25rem', maxWidth: '98%' }} onSubmit={handleSubmit}>
            <Stars rating={rating} setRating={setRating} />
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Review message"
                    onBlur={e => {
                        const message = e.target.value;
                        setMessage(message || null);
                    }}
                />
            </Form.Group>
            <Button variant="primary" size="sm" type="submit">Submit</Button>{" "}
            <Button variant="outline-secondary" size="sm" onClick={onCancel}>Cancel</Button>
        </Form>
    );
};

export default ReviewForm;