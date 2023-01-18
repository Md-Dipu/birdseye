import React from 'react';
import { Container } from 'react-bootstrap';
import unauthorizedImg from '../../../assets/images/unauthorized.jpg';

const Unauthorized = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">
                <img src={unauthorizedImg} alt="" className="w-50" />
            </div>
        </Container>
    );
};

export default Unauthorized;