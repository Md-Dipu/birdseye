import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm = ({ onError }) => {
    const formRef = useRef(null);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    useEffect(() => {
        const element = formRef.current;

        element.addEventListener('submit', handleSubmit(onSubmit));
        return () => element.removeEventListener('submit', handleSubmit(onSubmit));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Form ref={formRef}>
            <div className="h4 bold text-center text-uppercase"><span className="text-primary">Log</span> in</div>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register('email', { required: true })} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register('password', { required: true })} />
            </Form.Group>
            <Button
                as={Link}
                to="/register"
                variant="link"
                className="mb-3 d-block px-0 text-decoration-none text-start"
            >
                Don't have an account? Create now.
            </Button>
            <Button variant="success" type="submit">
                Log in
            </Button>{" "}
            <Button variant="outline-secondary" type="reset">
                Cancel
            </Button>
        </Form>
    );
};

export default LoginForm;