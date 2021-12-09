import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';

const HappyClient = () => {
    const clientsQuotes = [
        { clientName: 'Marqus Deved', quote: 'It was one of the most I enjoyable tour I ever go. Actully you gonna miss if you\'re not going in this vication. Good wishes from me. Happy tour!' },
        { clientName: 'Deson Monro', quote: 'I love to visite and I love to tour with a group. They has everything what you need and you will like. Just book a ticket and have some fun.' },
        { clientName: 'Maria Afrin', quote: 'I Love to enjoy my and visiting the world Birdeye made it easy for me and now its may hobby to go with birdeye tips and watching the world.' }
    ];
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
                        {clientsQuotes.map((quote, _idx) => <Carousel.Item>
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