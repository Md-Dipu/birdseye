import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';

const HappyClient = () => {
    const [clientsQuotes, setClientsQuotes] = useState([]);

    useEffect(() => {
        axios.get('https://intense-cliffs-52842.herokuapp.com/quotes')
            .then(res => setClientsQuotes(res.data))
            .catch(error => console.warn(error));
    }, []);

    return (
        <Container className="my-4">
            <h4 className="text-center text-uppercase my-3">happy <span className="text-info">client</span></h4>
            <Row xs={1} md={2} className="g-3">
                <Col>
                    <Container>
                        <Row xs={1} className="gy-3">
                            {[
                                {title: 'total tips', value: '78'},
                                {title: 'customers', value: '427'},
                                {title: 'happy client', value: '390'}
                            ].map((item, _idx) => <Col key={_idx} className="rounded shadow text-center py-3">
                                <span className="text-uppercase">{item.title}</span><br />
                                <span className="fs-2">{item.value}</span>
                            </Col>)}
                        </Row>
                    </Container>
                </Col>
                <Col className="shadow rounded d-flex">
                    <Carousel variant="dark" controls={false} className="p-3 text-center">
                        {clientsQuotes.map((quote, _idx) => <Carousel.Item key={_idx}>
                            <h4>{quote.clientName}</h4>
                            <blockquote className="fst-italic fs-5">"{quote.quote}"</blockquote>
                        </Carousel.Item>)}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
};

export default HappyClient;