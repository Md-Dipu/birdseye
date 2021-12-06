import React, { useEffect, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { addPlanDB } from '../../../utilities/API';
import { backToTop } from '../../../utilities/utilities';
import { InfoModal, WarnModal } from '../../Shared/Modals/Modals';
import InfoForm from '../InfoForm/InfoForm';

const AddPlan = () => {
    const [newPlan, setNewPlan] = useState({});
    const [confirmAdding, setConfirmAdding] = useState(false);
    const [showWarnModal, setShowWarnModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }
    const { register, handleSubmit, reset } = useForm();
    const handleAddPlan = data => {
        const { title, img_url, tourDays, rating, cost, starting_date, description } = data;
        const getNewPlan = {
            title,
            description,
            img_url,
            rating: parseFloat(rating),
            tourDays: parseInt(tourDays),
            cost: parseFloat(cost),
            starting_date
        };
        setNewPlan(getNewPlan);
        setConfirmAdding(false);
        setShowWarnModal(true);
    }

    // adding to database
    useEffect(() => {
        if (confirmAdding) {
            addPlanDB(newPlan)
                .then(res => {
                    setShowSuccessModal(true);
                    reset();
                })
                .catch(error => showFailedModal(true));
        }
    }, [confirmAdding]);

    return (
        <>
            {/* Confirmation Modal */}
            <WarnModal
                heading="Confirmation"
                messageText="Are you sure to add a new new plan?"
                buttonVariant="primary"
                show={showWarnModal}
                handleAction={() => {
                    setConfirmAdding(true);
                    setShowWarnModal(false);
                }}
                handleClose={() => setShowWarnModal(false)}
            />

            {/* Show success message */}
            <InfoModal 
                heading="Success"
                messageText="Process have completed successfully."
                buttonVariant="success"
                show={showSuccessModal}
                handleClose={() => setShowSuccessModal(false)}
            />
            
            {/* Show Failed message */}
            <InfoModal 
                heading="Failed"
                messageText="Process have failed complete."
                buttonVariant="danger"
                show={showFailedModal}
                handleClose={() => setShowFailedModal(false)}
            />
            
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
        </>
    );
};

export default AddPlan;