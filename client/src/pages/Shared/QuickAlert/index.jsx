import React from 'react';
import { Alert } from 'react-bootstrap';
import './QuickAlert.css';

const QuickAlert = ({ children, heading, icon, ...rest }) => {

    return (
        <Alert {...rest} className="be-custom-quick-alert position-absolute end-0 m-2 text-start p-3">
            <div className="d-flex">
                {icon && <div className="me-3">
                    {icon}
                </div>}
                <div>
                    <Alert.Heading className="fw-bold fs-6 m-0">{heading}</Alert.Heading>
                    <p className="fs-6 m-0">{children}</p>
                </div>
            </div>
        </Alert>
    );
};

export default QuickAlert;