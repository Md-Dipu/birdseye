import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { updatePlanById } from '../../../api/plansAPI';
import useAuth from '../../../hooks/useAuth';
import { filterUniqueProperties, parseDigitStrings } from '../../../utilities/utilities';
import UpdateCoverImage from './UpdateCoverImage';

const GeneralDetails = ({ onUpdate, ...plan }) => {
    const [editData, setEditData] = useState(false);

    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        parseDigitStrings(data);
        filterUniqueProperties(data, plan);
        updatePlanById(plan._id, data)
            .then(res => {
                if (res.data.data?.modifiedCount > 0) {
                    onUpdate();
                }
            })
            .catch(console.warn)
            .finally(() => setEditData(false));
    };

    const oncancel = () => {
        reset();
        setEditData(false);
    };

    return (
        <div className="my-3">
            <div className="d-flex justify-content-between">
                <div className="h5 text-secondary">General</div>
                {user.role === 'admin' && <Button variant="link" onClick={() => setEditData(true)}>Edit</Button>}
            </div>
            <Row>
                <Col md={3}>
                    <UpdateCoverImage id={plan._id} coverImageURL={plan.coverImageURL} onUpdate={onUpdate} />
                </Col>
                <Col md={9}>
                    <table>
                        <tbody>
                            {[
                                ['Name', plan.name],
                                ['Short Description', plan.shortDescription],
                                ['Price', `$${plan.price}`],
                                ['Tour days', `${plan.tourDays} Days`],
                                ['Starting date', new Date(plan.startingDate).toDateString().replace(' ', ', ')]
                            ].map((item, idx) => <tr key={idx}>
                                <th className="text-nowrap pe-3" style={{ verticalAlign: 'baseline' }}>{item[0]}:</th>
                                <td>{item[1]}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </Col>
            </Row>
            {editData && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '25rem', maxWidth: '98%' }} onSubmit={handleSubmit(onSubmit)}>
                <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Edit General Information</Form.Text>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue={plan.name} {...register('name', { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control as="textarea" rows={5} defaultValue={plan.shortDescription} {...register('shortDescription', { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" defaultValue={plan.price} {...register('price', { required: true })} />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tour days</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" defaultValue={plan.tourDays} {...register('tourDays', { required: true })} />
                        <InputGroup.Text>Days</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Starting date</Form.Label>
                    <Form.Control type="date" defaultValue={new Date(plan.startingDate).toISOString().substring(0, 10)} {...register('startingDate', { required: true })} />
                </Form.Group>
                <Button variant="success" size="sm" type="submit">Update</Button>{" "}
                <Button variant="outline-secondary" size="sm" onClick={oncancel}>Cancel</Button>
            </Form>}
        </div>
    );
};

export default GeneralDetails;