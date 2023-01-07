import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = () => {
    const [isConfirm, setIsConfirm] = useState(false);

    return (
        <Form>
            <div className="h4 bold text-center text-uppercase">Log in</div>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check onChange={e => setIsConfirm(e.target.checked)} type="checkbox" label="Are you agree with terms?" />
            </Form.Group>
            <Button variant="success" type="submit" size="sm" disabled={!isConfirm}>
                Log in
            </Button>{" "}
            <Button variant="outline-secondary" type="reset" size="sm">
                Cancel
            </Button>
        </Form>
    );
};

export default LoginForm;