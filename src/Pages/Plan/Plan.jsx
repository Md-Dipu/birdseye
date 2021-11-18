import { faClock, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Plan = props => {
    const { title, description, img_url, rating, tourDays, cost, starting_date } = props.plan;
    
    // Styles
    const stylePill = 'border rounded-pill px-2 py-1';

    return (
        <Card>
            <Card.Img variant="top" src={img_url} />
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                 {description}
            </Card.Text>
            <div className="d-flex justify-content-between">
                <h6 className={stylePill}><FontAwesomeIcon icon={faClock} /> {tourDays} Day</h6>
                <h6 className={stylePill}><FontAwesomeIcon icon={faStar} /> {rating.toFixed(1)}</h6>
                <h6 className={stylePill}><FontAwesomeIcon icon={faDollarSign} /> {cost}</h6>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-uppercase">{starting_date}</h4>
                <Card.Link as={Button} variant="warning" className="text-uppercase">details</Card.Link>
            </div>
            </Card.Body>
        </Card>
    );
};

export default Plan;