import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getPlanById } from '../../api/plansAPI';
import Loading from '../Shared/Loading/Loading';


const PlaceOrder = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { planId } = useParams();

    useEffect(() => {
        getPlanById(planId).then(res => {
            setData(res.data.data.value);
        }).catch(error => console.warn(error.message))
            .finally(() => setLoading(false));
    }, [planId]);

    if (loading) {
        return <Loading height="60" />
    }

    return (
        <Container fl className="my-4">
            <Row>
                <Col>
                    <Image src={data.coverImageURL} className="w-100" />
                </Col>
                <Col>
                    <div className="h1">{data.name}</div>
                    <div className="h6">On {new Date(data.startingDate).toDateString()}</div>
                    <p className="text-secondary">{data.shortDescription}</p>
                    {data.globalDiscount ? <p>Now at ${(data.price - (data.price * (data.globalDiscount / 100))).toFixed(2)}{" "}
                        <s className="text-secondary">${data.price}</s>{" "}
                        <Badge bg="warning" text="dark">
                            -{data.globalDiscount}%
                        </Badge>
                    </p> : <p>At ${data.price}</p>}
                    <Button variant="primary" className="rounded-0">Book now</Button>{" "}
                    <Button as={Link} to="/plans" variant="secondary" className="rounded-0">See more plans</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PlaceOrder;