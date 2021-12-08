import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const HappyClient = () => {
    return (
        <Container className="my-4">
            <h3 className="text-center text-uppercase my-3">happy <span className="text-info">client</span></h3>
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
                                <span className="fs-xxl">{item.value}</span>
                            </Col>)}
                        </Row>
                    </Container>
                </Col>
                <Col className="shadow rounded">
                    <Container className="my-3">
                        <h4>Lorem ipsum dolor sit amet.</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia perferendis suscipit repellat quo accusamus adipisci iste, vitae earum voluptatum possimus exercitationem veritatis quos facilis optio, fugit eligendi. Excepturi, distinctio natus.</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default HappyClient;