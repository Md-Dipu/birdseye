import React, { useEffect, useState } from 'react';
import { postReview } from '../../../api/reviewsAPI';
import useAuth from '../../../hooks/useAuth';
import ReviewForm from '../../Shared/Review/ReviewForm';

const PlanReview = ({ planId, onClose, onUpdate }) => {
    const [data, setData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (data && planId && user) {
            Object.assign(data, {
                to: 'plan',
                planId: planId,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });

            postReview(data).then(res => {
                if (res.data.status === 'success') {
                    onUpdate({
                        _id: res.data.data.insertedId,
                        rating: data.rating,
                        message: data.message,
                        user: { name: user.name }
                    });
                }
            }).catch(error => console.warn(error.message))
                .finally(onClose);
        }
    }, [data, onClose, onUpdate, planId, user]);

    return (
        <ReviewForm
            onSubmit={(data) => setData(data)}
            onCancel={onClose}
        />
    );
};

export default PlanReview;