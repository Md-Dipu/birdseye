import React, { useEffect, useState } from 'react';
import { getReviews } from '../../../api/reviewsAPI';
import Loading from '../../Shared/Loading';
import Stars from '../../Shared/Review/Stars';

const PlanReviews = ({ planId, rating }) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getReviews(`?to=plan&planId=${planId}&fields=rating,message,user.name,user.email`)
            .then(res => setReviews(res.data.data))
            .catch(error => console.warn(error.message))
            .finally(() => setIsLoading(false));
    }, [planId]);

    return (
        isLoading ? <Loading height="60" /> :
            <div className="my-3">
                <div className="text-secondary fs-6 mb-3">{rating} out of 5 ({reviews.length} reviews)</div>
                {reviews.map(review => <div key={review._id} className="mb-3">
                    <div className="d-flex">
                        <div className="text-secondary fw-bold me-3" title={review.user.email}>{review.user.name}</div>
                        <Stars rating={review.rating} mood="static" />
                    </div>
                    <div className="text-secondary">{review.message}</div>
                </div>)}
            </div>
    );
};

export default PlanReviews;