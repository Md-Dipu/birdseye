import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Stars = ({ rating, mood, setRating }) => {
    const [hoverStars, setHoverStars] = useState(null);

    if (mood === 'static') {
        return (
            <div>
                {[1, 2, 3, 4, 5].map(star => <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`${star <= rating ? 'text-warning' : 'text-secondary'}`}
                />)}
            </div>
        );
    }

    return (
        <div className="text-center mb-3">
            {[1, 2, 3, 4, 5].map(star => <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`fs-5 ${(hoverStars ? star <= hoverStars : star <= rating) ? 'text-warning' : 'text-secondary'}`}
                onClick={() => setRating(star)}
                onMouseOver={() => setHoverStars(star)}
                onMouseLeave={() => setHoverStars(null)}
            />)}
        </div>
    );
};

export default Stars;