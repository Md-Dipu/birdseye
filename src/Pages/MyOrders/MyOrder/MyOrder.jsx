import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

const MyOrder = props => {
    const { planId, orderDetails } = props;
    const [planDetails, setPlanDetails] = useState({});

    const { img_url } = planDetails;

    useEffect(() => {
        axios.get(`http://localhost:5000/plans/${planId}`)
            .then(res => setPlanDetails(res.data))
            .catch(error => console.warn(error));
    }, [planId]);


    // const date = new Date(orderDetails.date);
    // console.log(`${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);
    return (
        <Row className="my-3 p-2 rounded bg-light">
            <Col xs={12} md={2}>
                <Image src={img_url} className="w-100 rounded block" />
            </Col>
        </Row>
    );
};

export default MyOrder;