import React from 'react';
import { faClock, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { backToTop } from '../../../utilities/utilities';

const Plan = props => {
    const { _id, title, description, img_url, rating, tourDays, cost, starting_date } = props.plan;

    // get date string
    const month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const date = new Date(starting_date);
    const dateStr = `${month[date.getMonth()].substring(0, 3).toUpperCase()} ${date.getDate()}, ${date.getFullYear()}`;

    // negivator
    const history = useHistory();
    
    // Styles
    const stylePill = 'border rounded-pill px-2 py-1';

    return (
        <Card>
            <Card.Img variant="top" src={img_url} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text style={{ color: '#626262' }}>
                    {description}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <h6 className={stylePill}><FontAwesomeIcon icon={faClock} /> {tourDays} Day</h6>
                    <h6 className={stylePill}><FontAwesomeIcon icon={faStar} /> {(rating || 0).toFixed(1)}</h6>
                    <h6 className={stylePill}><FontAwesomeIcon icon={faDollarSign} /> {cost}</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="text-uppercase">{dateStr}</h4>
                    <Card.Link 
                        as={Button} 
                        variant="warning" 
                        className="text-uppercase"
                        onClick={() => {
                            backToTop();
                            history.push(`/plans/${_id}`)
                        }}
                    >
                        details
                    </Card.Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Plan;