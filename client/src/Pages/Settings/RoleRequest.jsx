import React from 'react';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';

const RoleRequest = () => {
    const { user } = useAuth();

    return (
        <div className="my-3" id="role-request">
            <div className="h5 text-secondary">Role request</div>
            <div className="shadow-sm p-3 rounded border">
                <p className="text-secondary">Your current role is <span className="fw-bold">{user.role}</span>. You can request a role. Admin is only will be able to approve your request. If you wanna change your role make change request and wait for approval.</p>
                <Button variant="outline-primary" size="sm" className="rounded-0">Change role</Button>
            </div>
        </div>
    );
};

export default RoleRequest;