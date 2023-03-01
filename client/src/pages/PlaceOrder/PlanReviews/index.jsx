import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../../api/reviewsAPI';
import useAuth from '../../../hooks/useAuth';
import Stars from '../../Shared/Review/Stars';
import PlanReview from './PlanReview';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isUserReviewable, setIsUserReviewable] = useState(false);

    const onUpdate = (newReview) => {
        setIsUserReviewable(false);
        setReviews([...reviews, newReview]);
    };

    const { planId } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        getReviews(`?to=plan&planId=${planId}&fields=rating,message,user.name`)
            .then(res => setReviews(res.data.data))
            .catch(error => console.warn(error.message));
    }, [planId]);

    useEffect(() => {
        if (planId && user) {
            getReviews(`?to=plan&user.id=${user._id}&planId=${planId}`)
                .then(res => {
                    if (res.data.count === 0) {
                        setIsUserReviewable(true);
                    }
                }).catch(error => {
                    setIsUserReviewable(true);
                    console.warn(error.message);
                });
        }
    }, [planId, user]);

    const ReviewItem = (props) => {
        return (
            <div className="mb-3">
                <div className="d-flex">
                    <div className="text-secondary fw-bold me-3">{props.user.name}</div>
                    <Stars rating={props.rating} mood="static" />
                </div>
                <div className="text-secondary">{props.message}</div>
            </div>
        );
    };

    return (
        <div className="my-3">
            <div className="h5">Reviews</div>
            {reviews.length ? reviews.map(review => <ReviewItem
                key={review._id}
                {...review}
            />) : <div className="text-secondary">No reviews added</div>}
            {showForm && <PlanReview
                planId={planId}
                onClose={() => setShowForm(false)}
                onUpdate={onUpdate}
            />}
            {isUserReviewable && <Button
                variant="outline-secondary"
                size="sm"
                className="rounded-0"
                onClick={() => setShowForm(true)}
            >
                Add new review
            </Button>}
        </div>
    );
};

export default Reviews;