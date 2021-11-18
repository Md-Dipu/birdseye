import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = props => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: `${props.height}vh` }}>
            <Spinner animation="border"  variant="success" />
        </div>
    );
};

export default Loading;