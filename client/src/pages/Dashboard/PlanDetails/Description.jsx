import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updatePlanDescriptionById } from '../../../api/plansAPI';
import useAuth from '../../../hooks/useAuth';
import './Description.css';

const Description = ({ id, description, onUpdate }) => {
    const [edit, setEdit] = useState(false);
    const [items, setItems] = useState([{
        title: '',
        contentText: ''
    }]);

    const { user } = useAuth();

    useEffect(() => {
        if (Array.isArray(description) && description.length > 0) {
            setItems(description);
        }
    }, [description]);

    const handleAddItem = () => {
        if (items.length !== 0 && (items[items.length - 1].title === '' || items[items.length - 1].contentText === '')) {
            return;
        }

        setItems([...items, {
            title: '',
            contentText: ''
        }]);
    };

    const handleCancel = () => setEdit(false);

    const onBlur = (text, index, field) => {
        items[index][field] = text;
        setItems(items);
    };

    const onSubmit = e => {
        e.preventDefault();
        updatePlanDescriptionById(id, items.filter(item => item.title !== '' && item.contentText !== ''))
            .then(res => {
                if (res.data.data?.modifiedCount > 0) {
                    onUpdate();
                }
            })
            .catch(console.warn)
            .finally(() => setEdit(false));
    };

    return (
        <div className="my-3">
            <div className="d-flex justify-content-between">
                <div className="h5 text-secondary">Description</div>
                {user.role === 'admin' && <Button variant="link" onClick={() => setEdit(true)}>Edit</Button>}
            </div>
            {description?.map((item) => <div className="mb-3" key={`${item.title}-${new Date().toString()}`}>
                <div className="h6">{item.title}</div>
                <div className="text-secondary">{item.contentText}</div>
            </div>)}
            {edit && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3 be-description-edit-form" onSubmit={onSubmit}>
                <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Edit Description</Form.Text>
                {items.map((item, idx) => <Form.Group key={idx} className="mb-3">
                    <Form.Control type="text" className="mb-3" defaultValue={item.title} placeholder="Title" onBlur={(e) => onBlur(e.target.value, idx, 'title')} />
                    <Form.Control as="textarea" rows={5} defaultValue={item.contentText} placeholder="Content" onBlur={(e) => onBlur(e.target.value, idx, 'contentText')} />
                </Form.Group>)}
                <Button variant="success" size="sm" type="submit">Update</Button>{" "}
                <Button variant="secondary" size="sm" onClick={handleAddItem}>Add more</Button>{" "}
                <Button variant="outline-secondary" size="sm" onClick={handleCancel}>Cancel</Button>
            </Form>}
        </div>
    );
};

export default Description;