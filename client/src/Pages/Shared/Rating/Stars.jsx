import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Stars = ({ rating, setRating }) => {

    return (
        <div className="text-center mb-3">
            {[1, 2, 3, 4, 5].map(star => <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`fs-5 ${(star <= rating) ? 'text-warning' : 'text-secondary'}`}
                onMouseOver={() => setRating(star)}
            />)}
        </div>
    );
};

export default Stars;