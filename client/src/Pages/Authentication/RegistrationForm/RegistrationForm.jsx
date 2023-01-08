import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ onError, onSuccess }) => {
    const [isConfirm, setIsConfirm] = useState(false);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h4 bold text-center text-uppercase"><span className="text-primary">Register</span> now</div>
            <Form.Group className="mb-3">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" {...register('name', { required: true })} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register('email', { required: true })} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register('password', { required: true })} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contact number</Form.Label>
                <Form.Control type="text" placeholder="Contact number" {...register('contactNumber', { required: true })} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check onChange={e => setIsConfirm(e.target.checked)} type="checkbox" label="Are you agree with terms and conditions?" />
            </Form.Group>
            <Button
                as={Link}
                to="/login"
                variant="link"
                className="mb-3 d-block px-0 text-decoration-none text-start"
            >
                Already have an account? Log in now.
            </Button>
            <Button variant="primary" type="submit" disabled={!isConfirm}>
                Sign up
            </Button>{" "}
            <Button variant="outline-secondary" type="reset">
                Cancel
            </Button>
        </form>
    );
};

export default RegistrationForm;