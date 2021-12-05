import React from 'react';
import { Button, ButtonGroup, Image } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { backToTop } from '../../utilities/utilities';

const NotFound = () => {
    const history = useHistory();
    const location = useLocation();
    if (!location.hash) {
        backToTop();
    }

    return (
        <div>
            <Image src="https://i.ibb.co/BfFjb2r/404.jpg" className="d-block mx-auto" fluid />
            <div className="text-center mb-3">
                <h6>404: Page not found</h6>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => history.push('/')}>Go Home</Button>
                    <Button variant="warning" onClick={() => history.goBack()}>Go Back</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default NotFound;