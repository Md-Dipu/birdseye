import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { roleRequest } from '../../api/notificationsAPI';
import useAuth from '../../hooks/useAuth';

const RoleRequest = () => {
    const [show, setShow] = useState(false);

    const { user } = useAuth();
    const { handleSubmit, register, reset } = useForm();

    const onClose = () => {
        reset();
        setShow(false);
    };

    const onSubmit = data => {
        data.userId = user._id;
        roleRequest(`Role request from ${user.name} for role ${data.role}. Approve the request as soon as possible.`, data)
            .then(onClose).catch(error => console.warn(error.message));
    };

    return (
        <div className="my-3" id="role-request">
            <div className="h5 text-secondary">Role request</div>
            <div className="shadow-sm p-3 rounded border">
                <p className="text-secondary">Your current role is <span className="fw-bold">{user.role}</span>. You can request a role. Admin is only will be able to approve your request. If you wanna change your role make change request and wait for approval.</p>
                <Button variant="outline-primary" size="sm" className="rounded-0" onClick={() => setShow(true)}>Change role</Button>
            </div>
            {show && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '18rem', maxWidth: '98%' }} onSubmit={handleSubmit(onSubmit)}>
                <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Select role</Form.Text>
                <Form.Group className="mb-3">
                    <Form.Select {...register('role', { required: true })}>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" size="sm" type="submit">Request</Button>{" "}
                <Button variant="outline-secondary" size="sm" onClick={onClose}>Cancel</Button>
            </Form>}
        </div>
    );
};

export default RoleRequest;