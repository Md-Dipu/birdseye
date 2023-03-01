import React from 'react';
import { Container } from 'react-bootstrap';
import unauthorizedImg from '../../../assets/images/unauthorized.jpg';
import './Unauthorized.css';

const Unauthorized = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">
                <img src={unauthorizedImg} alt="" className="be-unauthorized-image" />
            </div>
        </Container>
    );
};

export default Unauthorized;