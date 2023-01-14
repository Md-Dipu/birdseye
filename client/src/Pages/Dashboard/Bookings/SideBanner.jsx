import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const SideBanner = () => {
    return (
        <>
            <Card bg="dark" text="white" className="mb-3 my-auto">
                <Card.Body>
                    The world is a book and those who do not travel read only one page.
                    You just have to book a plan, we'll arrange everything for you. So, why your waiting.
                    <Button as={Link} to="/plans" variant="outline-secondary" className="d-block mt-3 rounded-0">Book a plan now</Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default SideBanner;