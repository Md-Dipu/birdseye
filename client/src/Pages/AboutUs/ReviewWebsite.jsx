import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { postReview } from '../../api/reviewsAPI';
import useAuth from '../../hooks/useAuth';
import ReviewForm from '../Shared/Review/ReviewForm';
import img from '../../assets/images/done-icon.png';

const ReviewWebsite = () => {
    const [showForm, setShowForm] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }
    }, [success]);

    const { user } = useAuth();

    const onClose = () => setShowForm(false);
    const onSubmit = (data) => {
        Object.assign(data, {
            to: 'site',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

        postReview(data).then(res => {
            if (res.data.status === 'success') {
                setSuccess(true);
            }
        }).catch(error => console.warn(error.message))
            .finally(onClose);
    };

    return (
        user ? <>
            <Button
                variant="outline-light"
                onClick={() => setShowForm(true)}
            >Review website</Button>
            {showForm && <ReviewForm
                onSubmit={onSubmit}
                onCancel={onClose}
            />}
            {success && <div className="bg-white text-success shadow position-fixed top-50 start-50 translate-middle border rounded-pill p-1" style={{ width: '15rem' }}>
                <img src={img} alt="Review done" className="w-100" />
            </div>}
        </> : null
    );
};

export default ReviewWebsite;