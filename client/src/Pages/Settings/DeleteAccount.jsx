import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { deleteUserById } from '../../api/usersAPI';
import useAuth from '../../hooks/useAuth';

const DeleteAccount = () => {
    const [show, setShow] = useState(false);

    const { user, deleteCurrentUser } = useAuth();
    const history = useHistory();

    const handleDelete = async () => {
        const userId = user._id;

        try {
            await deleteCurrentUser();
            await deleteUserById(userId);
            history.push('/');
        } catch (error) {
            console.warn(error.message);
        }
    };

    return (
        <div className="my-3" id="delete-account">
            <div className="h5 text-secondary">Delete account</div>
            <div className="shadow-sm p-3 rounded border">
                <p className="text-secondary">You're member of birdseye travel planner from <span className="fw-bold">{new Date(user.createdAt).toDateString().replace(' ', ', ')}</span>. Your current member role is <span className="fw-bold">{user.role?.toLocaleUpperCase()}</span>. But you can delete your account anytime. To delete you account click on <span className="fw-bold">Delete</span> button.</p>
                <Button variant="danger" size="sm" className="rounded-0" onClick={() => setShow(true)}>Delete</Button>
            </div>
            {show && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '18rem', maxWidth: '98%' }}>
                <Form.Text className="d-block mb-3">If you sure to delete your account, press confirm button.</Form.Text>
                <Button variant="danger" size="sm" onClick={handleDelete}>Confirm</Button>{" "}
                <Button variant="outline-secondary" size="sm" onClick={() => setShow(false)}>Cancel</Button>
            </Form>}
        </div>
    );
};

export default DeleteAccount;