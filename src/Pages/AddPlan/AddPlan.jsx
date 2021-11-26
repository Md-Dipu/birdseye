import axios from 'axios';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddPlan = () => {
    const { register, handleSubmit, reset } = useForm();
    const handleAddPlan = data => {
        const { title, img_url, tourDays, rating, cost, starting_date, description } = data;
        axios.post('http://localhost:5000/plans', {
            title,
            description,
            img_url,
            rating: parseFloat(rating),
            tourDays: parseInt(tourDays),
            cost: parseFloat(cost),
            starting_date
        })
            .then(res => alert(`Adding Status:${res.statusText} with plan id:${res.data.insertedId}`))
            .catch(error => console.warn(error));
        reset();
    }

    return (
        <Container className="my-3">
            <Row>
                <Col xs={12} md={2} lg={3} />
                <Col xs={12} md={8} lg={6}>
                <form onSubmit={handleSubmit(handleAddPlan)}>
                    <h3 className="text-center my-3">Add a new plan</h3>
                    <input type="text" className="form-control mb-3" placeholder="Title" {...register('title', { required: true })} />
                    <input type="text" className="form-control mb-3" placeholder="IBB Image URL" {...register('img_url', { required: true })} />
                    
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Tour Days" {...register('tourDays', { required: true })} />
                        <input type="text" className="form-control" placeholder="Rating" {...register('rating', { required: true })} />
                        <input type="text" className="form-control" placeholder="Cost" {...register('cost', { required: true })} />
                    </div>
                    
                    <input type="text" className="form-control mb-3" placeholder="Starting Date" {...register('starting_date', { required: true })} />
                    <textarea className="form-control mb-3" placeholder="Description" rows="6" {...register('description', { required: true })} />
                    
                    <div>
                        <input type="submit" value="Add new" className="btn btn-primary" />{" "}
                        <input type="reset" value="Cancel" className="btn btn-outline-secondary" />
                    </div>
                </form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPlan;