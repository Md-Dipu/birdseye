import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../../api/reviewsAPI';
import Stars from '../../Shared/Review/Stars';
import Review from './Review';

const Reviews = () => {
    const [reviews, setReviews] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [updateObserver, setUpdateObserver] = useState(0);

    const { planId } = useParams();
    const onUpdate = () => setUpdateObserver(updateObserver + 1);

    useEffect(() => {
        getReviews(`?to=plan&planId=${planId}`)
            .then(res => setReviews(res.data.data))
            .catch(error => console.warn(error.message));
    }, [planId, updateObserver]);

    const ReviewItem = (review) => {
        return (
            <div className="mb-3">
                <div className="d-flex">
                    <div className="text-secondary fw-bold me-3">{review.user.name}</div>
                    <Stars rating={review.rating} mood="static" />
                </div>
                <div className="text-secondary">{review.message}</div>
            </div>
        );
    };

    return (
        <div className="my-3">
            <div className="h5">Reviews</div>
            {reviews ? reviews.map(ReviewItem) : <div className="text-secondary">No reviews added</div>}
            {showForm && <Review
                planId={planId}
                onClose={() => setShowForm(false)}
                onUpdate={onUpdate}
            />}
            <Button
                variant="outline-secondary"
                size="sm"
                className="rounded-0"
                onClick={() => setShowForm(true)}
            >
                Add new review
            </Button>
        </div>
    );
};

export default Reviews;