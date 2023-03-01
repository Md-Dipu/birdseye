import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { storage } from '../../../config/Firebase/firebase.init';
import { backToTop } from '../../../utilities/utilities';
import { postPlan } from '../../../api/plansAPI';
import InfoForm from './InfoForm';

const AddPlan = () => {
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState(null);

    const history = useHistory();

    useEffect(() => {
        if (!data) return;

        postPlan(data).then(res => {
            if (res.data.data?.insertedId) {
                history.push(`/dashboard/manage-plans/${res.data.data.insertedId}`);
            }
        }).catch(error => {
            console.log(error.message);
            setData(null);
        }).finally(() => {
            setProgress(null);
            setData(null);
        });
    }, [data, history]);

    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }

    const { register, handleSubmit } = useForm();
    const handleAddPlan = data => {
        const fileRef = ref(storage, `images/plans/cover images/${data.image[0].name}`);
        const uploadTask = uploadBytesResumable(fileRef, data.image[0]);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
                    setData({
                        name: data.name,
                        shortDescription: data.shortDescription,
                        coverImageURL: downloadUrl,
                        price: parseFloat(data.price),
                        tourDays: parseInt(data.tourDays),
                        startingDate: data.startingDate
                    });
                });
            }
        );
    };

    return (
        <Container className="my-3">
            <Row>
                <Col xs={12} md={2} lg={3} />
                <Col xs={12} md={8} lg={6}>
                    <InfoForm
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={handleAddPlan}
                    />
                    {(progress !== null) && <div className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '20rem', maxWidth: '95%' }}>
                        <ProgressBar animated now={progress} />
                    </div>}
                </Col>
            </Row>
        </Container>
    );
};

export default AddPlan;