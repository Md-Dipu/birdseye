import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { addPlanDB } from '../../../utilities/API';
import { backToTop } from '../../../utilities/utilities';
import InfoForm from '../InfoForm/InfoForm';

const AddPlan = () => {
    backToTop();
    const { register, handleSubmit, reset } = useForm();
    const handleAddPlan = data => {
        console.log(data);
        const { title, img_url, tourDays, rating, cost, starting_date, description } = data;
        const newPlan = {
            title,
            description,
            img_url,
            rating: parseFloat(rating),
            tourDays: parseInt(tourDays),
            cost: parseFloat(cost),
            starting_date
        };
        addPlanDB(newPlan);
        reset();
    }

    return (
        <Container className="my-3">
            <Row>
                <Col xs={12} md={2} lg={3} />
                <Col xs={12} md={8} lg={6}>
                    <InfoForm 
                        register={register}
                        handleSubmit={handleSubmit}
                        handleAddPlan={handleAddPlan}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default AddPlan;