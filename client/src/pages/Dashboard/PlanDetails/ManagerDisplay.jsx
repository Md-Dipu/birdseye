import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateManagerId } from '../../../api/plansAPI';
import { getUsers } from '../../../api/usersAPI';
import './ManagerDisplay.css';

const ManagerDisplay = ({ id, manager, onUpdate }) => {
    const [edit, setEdit] = useState(false);
    const [searchText, setSearchText] = useState(null);
    const [managers, setManagers] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        setManagers([]);
        if (typeof searchText === 'string') {
            setData(null);
        }

        if (searchText) {
            getUsers(`?role=manager&$text[$search]="${searchText}"&fields=name,email,contactNumber`)
                .then(res => {
                    const data = res.data.data;
                    data.forEach(manager => {
                        delete Object.assign(manager, { userId: manager._id })._id;
                    });

                    return data;
                })
                .then(setManagers)
                .catch(error => console.warn(error.message));
        }
    }, [searchText]);

    const onCancel = () => {
        setSearchText(null);
        setManagers([]);
        setEdit(false);
        setData(null);
    };

    const onSubmit = e => {
        e.preventDefault();
        updateManagerId(id, data)
            .then(res => {
                if (res.data.data?.modifiedCount > 0) {
                    onUpdate();
                }
            })
            .catch(error => console.warn(error.message))
            .finally(onCancel);
    };

    return (
        <div className="my-3">
            <div className="d-flex justify-content-between">
                <div className="h5 text-secondary">Manager</div>
                <Button variant="link" onClick={() => setEdit(true)}>Edit</Button>
            </div>
            {manager ? <table>
                <tbody>
                    {[
                        ['Name', manager.name],
                        ['Email', manager.email],
                        ['Contact', manager.contactNumber]
                    ].map((item, _idx) => <tr key={_idx}>
                        <th className="pe-3">{item[0]}:</th>
                        <td>{item[1]}</td>
                    </tr>)}
                </tbody>
            </table> : <div className="text-secondary">Manager not added</div>}
            {edit && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '18rem', maxWidth: '95%' }} onSubmit={onSubmit}>
                <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Edit manager</Form.Text>
                <Form.Group className="mb-3">
                    <Form.Control type="search" placeholder="Find manager..." value={data?.name || searchText} onChange={e => setSearchText(e.target.value)} />
                    {managers.length > 0 && <div className="position-absolute bg-white border rounded mt-1" style={{ width: 'calc(100% - 2rem)', zIndex: 1 }}>
                        {managers.map(item => <Form.Text
                            as="span"
                            className="d-block p-2 m-0 be-manager-list-item-hover"
                            onClick={() => {
                                setSearchText(null);
                                setData(item);
                            }}
                        >
                            {item.name}
                        </Form.Text>)}
                    </div>}
                </Form.Group>
                <Button variant="success" size="sm" type="submit" disabled={!data}>Update</Button>{" "}
                <Button variant="outline-secondary" size="sm" onClick={onCancel}>Cancel</Button>
            </Form>}
        </div>
    );
};

export default ManagerDisplay;