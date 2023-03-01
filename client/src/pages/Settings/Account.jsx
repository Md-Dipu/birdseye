import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { filterUniqueProperties } from '../../utilities/utilities';
import { updateUserById } from '../../api/usersAPI';

const Account = () => {
    const [edit, setEdit] = useState(false);

    const { user, setUser } = useAuth();
    const { handleSubmit, register, reset } = useForm();

    const onClose = () => {
        reset();
        setEdit(false);
    };

    const onSubmit = (data) => {
        filterUniqueProperties(data, user);
        if (Object.keys(data).length !== 0) {
            // non empty object 
            updateUserById(user._id, data).then(() => {
                setUser({ ...user, ...data });
                onClose();
            }).catch(error => console.warn(error.message));
        }
    };

    return (
        <div className="my-3" id="account">
            <div className="d-flex justify-content-between align-items-center">
                <div className="h5 text-secondary">Account</div>
                <Button variant="link" className="text-dark" title="Edit" onClick={() => setEdit(true)}>
                    <FontAwesomeIcon icon={faUserEdit} />
                </Button>
            </div>
            <table>
                <tbody>
                    {[
                        ['Object Id', user._id],
                        ['Name', user.name],
                        ['Email', user.email],
                        ['Contact', user.contactNumber]
                    ].map((item, idx) => <tr key={idx}>
                        <th className="text-nowrap pe-3" style={{ verticalAlign: 'baseline' }}>{item[0]}:</th>
                        <td>{item[1]}</td>
                    </tr>)}
                </tbody>
            </table>
            {edit && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '25rem', maxWidth: '98%' }} onSubmit={handleSubmit(onSubmit)}>
                <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Edit Account Information</Form.Text>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue={user.name} {...register('name', { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue={user.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" defaultValue={user.contactNumber} {...register('contactNumber', { required: true })} />
                </Form.Group>
                <Button variant="success" size="sm" type="submit">Update</Button>{" "}
                <Button variant="outline-secondary" size="sm" onClick={onClose}>Cancel</Button>
            </Form>}
        </div>
    );
};

export default Account;