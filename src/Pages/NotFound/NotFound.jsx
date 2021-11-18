import React from 'react';
import { Button, ButtonGroup, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Image src="https://i.ibb.co/BfFjb2r/404.jpg" className="d-block mx-auto" fluid />
            <div className="text-center mb-3">
                <h6>404: Page not found</h6>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => navigate('/#home')}>Go Home</Button>
                    <Button variant="warning" onClick={() => navigate(-1)}>Go Back</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default NotFound;