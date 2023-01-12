import React from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Banner = (props) => {

    const { user } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const handleBooking = () => {
        if (!user) {
            history.push('/login', { from: location });
        }

        props.handleShowForm(true);
    };

    return (
        <Row className="mb-3">
            <Col className="mt-3" md="6" xs="12">
                <Image src={props.coverImageURL} className="w-100" />
            </Col>
            <Col className="mt-3" md="6" xs="12">
                <div className="h1">{props.name}</div>
                <div className="h6">On {new Date(props.startingDate).toDateString()}</div>
                <p className="text-secondary">{props.shortDescription}</p>
                {props.globalDiscount ? <p>Now at ${props.payable.toFixed(2)}{" "}
                    <s className="text-secondary">${props.price}</s>{" "}
                    <Badge bg="warning" text="dark">
                        -{props.globalDiscount}%
                    </Badge>
                </p> : <p>At ${props.payable}</p>}
                <Button variant="primary" className="rounded-0" onClick={handleBooking}>Book now</Button>{" "}
                <Button as={Link} to="/plans" variant="outline-secondary" className="rounded-0">See more plans</Button>
            </Col>
        </Row>
    );
};

export default Banner;