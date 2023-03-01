import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updatePlanStatusById } from '../../../api/plansAPI';

const ChangeStatus = ({ id, status: currentStatus, onUpdate, onClose }) => {
    const statusRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const status = statusRef.current.value;
        if (status !== currentStatus) {
            updatePlanStatusById(id, status)
                .then(res => {
                    if (res.data.data?.modifiedCount > 0) {
                        onUpdate();
                    }
                })
                .catch(console.warn)
                .finally(onClose);
        }
    };

    return (
        <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '18rem', maxWidth: '98%' }} onSubmit={onSubmit}>
            <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Change Status</Form.Text>
            <Form.Group className="mb-3">
                <Form.Select ref={statusRef}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="discontinued">Discontinued</option>
                </Form.Select>
            </Form.Group>
            <Button variant="success" size="sm" type="submit">Update</Button>{" "}
            <Button variant="outline-secondary" size="sm" onClick={onClose}>Cancel</Button>
        </Form>
    );
};

export default ChangeStatus;