import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { deletePlan } from '../../../api/plansAPI';

const DeletePlan = ({ id, onClose }) => {
    const history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();
        deletePlan(id)
            .then(res => {
                if (res.data.data?.deletedCount) {
                    history.push('/dashboard/manage-plans');
                }
            })
            .catch(console.warn)
            .finally(onClose);
    };

    return (
        <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '18rem', maxWidth: '98%' }} onSubmit={onSubmit}>
            <Form.Text className="d-block mb-3">If you sure to delete plan of id:{id}, press confirm button.</Form.Text>
            <Button variant="danger" size="sm" type="submit">Confirm</Button>{" "}
            <Button variant="outline-secondary" size="sm" onClick={onClose}>Cancel</Button>
        </Form>
    );
};

export default DeletePlan;