import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const LoginForm = ({ onError }) => {
    const { setIsLoading, logInUsingEmailAndPassword } = useAuth();
    const { register, handleSubmit } = useForm();
    const onSubmit = ({ email, password }) => {
        logInUsingEmailAndPassword(email, password)
            .then(() => { })
            .catch(({ message }) => onError({
                heading: 'Failed to login',
                message
            }))
            .finally(() => setIsLoading(false));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
    );
};

export default LoginForm;