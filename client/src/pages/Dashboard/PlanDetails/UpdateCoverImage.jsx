import React, { useEffect, useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { storage } from '../../../config/Firebase/firebase.init';
import { updatePlanCoverImageURLById } from '../../../api/plansAPI';
import useAuth from '../../../hooks/useAuth';
import './UpdateCoverImage.css';

const UpdateCoverImage = ({ id, coverImageURL, onUpdate }) => {
    const [data, setData] = useState(null);
    const [edit, setEdit] = useState(false);
    const [progress, setProgress] = useState(null);

    const imageRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        if (data) {
            updatePlanCoverImageURLById(id, data)
                .then(res => {
                    if (res.data.data?.modifiedCount > 0) {
                        onUpdate();
                    }
                })
                .catch(error => console.warn(error.message))
                .finally(() => {
                    setData(null);
                    setProgress(null);
                    setEdit(false);
                });
        }
    }, [data, id, onUpdate]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!imageRef.current.files[0]) return;

        const fileRef = ref(storage, `images/plans/cover images/${id}-${new Date().toISOString()}`);
        const uploadTask = uploadBytesResumable(fileRef, imageRef.current.files[0]);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.warn(error.message);
                setProgress(null);
            },
            () => getDownloadURL(uploadTask.snapshot.ref).then(setData)
                .catch(error => console.warn(error.message))
        );
    };

    return (
        <div className="position-relative mt-2 be-hover">
            <img src={coverImageURL} alt="" className="w-100 rounded" />
            {user.role === 'admin' && <div className="position-absolute top-0 start-0 end-0 bottom-0 justify-content-center align-items-center be-show be-flex">
                <Button variant="primary" size="sm" onClick={() => setEdit(true)}>Update</Button>
            </div>}
            {edit && <Form className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '25rem', maxWidth: '98%' }} onSubmit={handleSubmit}>
                <Form.Text className="d-block text-center mb-3 fw-bold fs-6">Edit General Information</Form.Text>
                <Form.Group className="mb-3">
                    <Form.Label>Cover image</Form.Label>
                    <Form.Control type="file" ref={imageRef} />
                </Form.Group>
                <Button variant="success" size="sm" type="submit">Update</Button>{" "}
                <Button variant="outline-secondary" size="sm" type="reset" onClick={() => setEdit(false)}>Cancel</Button>
            </Form>}
            {(progress !== null) && <div className="bg-white shadow position-fixed top-50 start-50 translate-middle border rounded p-3" style={{ width: '20rem', maxWidth: '95%' }}>
                <ProgressBar animated now={progress} />
            </div>}
        </div>
    );
};

export default UpdateCoverImage;