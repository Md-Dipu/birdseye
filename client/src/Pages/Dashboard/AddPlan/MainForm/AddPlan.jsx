import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { storage } from '../../../../config/Firebase/firebase.init';
import { backToTop } from '../../../../utilities/utilities';
import InfoForm from '../InfoForm/InfoForm';
import { postPlan } from '../../../../api/plansAPI';

const AddPlan = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!data) return;

        postPlan(data).then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }, [data]);

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
                console.log(`Upload is ${progress}% done`);
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
                })
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
                </Col>
            </Row>
        </Container>
    );
};

export default AddPlan;