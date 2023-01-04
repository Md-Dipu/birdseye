import React from 'react';
import { faClock, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { backToTop } from '../../../utilities/utilities';

const Plan = props => {
    const history = useHistory();
    const stylePill = 'border rounded-pill px-2 py-1';
    const date = new Date(props.startingDate);

    return (
        <Card>
            <Card.Img variant="top" src={props.coverImageURL} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text style={{ color: '#626262' }}>
                    {props.shortDescription}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <h6 className={stylePill}><FontAwesomeIcon icon={faClock} /> {props.tourDays} Day</h6>
                    <h6 className={stylePill}><FontAwesomeIcon icon={faStar} /> {(props.rating).toFixed(1)}</h6>
                    <h6 className={stylePill}><FontAwesomeIcon icon={faDollarSign} /> {props.price}</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <h4>{new Intl.DateTimeFormat(['ban', 'id']).format(date)}</h4>
                    <Card.Link
                        as={Button}
                        variant="warning"
                        className="text-uppercase"
                        onClick={() => {
                            backToTop();
                            history.push(`/plans/${props._id}`)
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