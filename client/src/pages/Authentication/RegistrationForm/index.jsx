import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { createUser } from '../../../api/usersAPI';
import useAuth from '../../../hooks/useAuth';

const RegistrationForm = ({ onError }) => {
    const [isConfirm, setIsConfirm] = useState(false);

    const { user, setIsLoading, signUpUsingEmailAndPassword, updateUserOnFirebase, logOut } = useAuth();
    const { register, handleSubmit } = useForm();

    const onSubmit = ({ name, email, password, contactNumber }) => {
        setIsLoading(true);
        createUser({ name, email, contactNumber }).then(async res => {
            try {
                if (res.data.status === 'fail') {
                    throw new Error(res.data.message);
                }

                await signUpUsingEmailAndPassword(email, password);
                await updateUserOnFirebase({ displayName: name });

            } catch (error) {
                onError({
                    heading: 'Failed to sign up',
                    message: error.message
                });

                if (user) {
                    logOut();
                }
            }
        }).catch(({ message }) => onError({
            heading: 'Failed to sign up',
            message
        })).finally(() => setIsLoading(false));
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