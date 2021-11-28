import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';

const PlanDetails = () => {
    const [plan, setPlan] = useState({});
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const { planId } = useParams();

    const { title, description, img_url, rating, tourDays, cost, starting_date } = plan;

    useEffect(() => {
        axios.get(`http://localhost:5000/plans/${planId}`)
        .then(res => setPlan(res.data))
        .catch(error => console.warn(error));
    }, [planId]);
    
    return (
        <Container>
            <Row xs={1} lg={2} className="my-3">
                <Col>
                <div className="border-0">
                    <Image src={img_url} className="w-100" />
                    <div className="my-3">
                    <h4>{title}</h4>
                    <p>
                        {description}
                    </p>
                    
                    <h5>Details</h5>
                    <table className="table my-3">
                        <tbody>
                            <tr className="border-top">
                                <th scope="row">Cost</th>
                                <td>$ {cost}</td>
                            </tr>
                            <tr>
                                <th scope="row">Rating</th>
                                <td>{rating}</td>
                            </tr>
                            <tr>
                                <th scope="row">Tour Days</th>
                                <td>{tourDays} days</td>
                            </tr>
                            <tr>
                                <th scope="row">Starting date</th>
                                <td className="text-uppercase">{starting_date}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="my-3">
                        <h5>Book ticket for this plan</h5>
                        <form onSubmit={e => e.preventDefault()}>
                            <label className="form-label" htmlFor="number-of-tickets">How much ticket you need?</label>
                            <div className="input-group mb-3" style={{ width: '10rem' }}>
                                <button 
                                    className="btn btn-light"
                                    onClick={() => {
                                        if (!(numberOfTickets - 1 < 1))
                                            setNumberOfTickets(numberOfTickets - 1);
                                    }}
                                >-</button>
                                
                                <input 
                                    className="form-control border-light" 
                                    name="number-of-tickets"
                                    value={numberOfTickets}
                                    onChange={e => {
                                        const inputValue = parseInt(e.target.value);
                                        isNaN(inputValue) ?
                                        setNumberOfTickets(0) :
                                        setNumberOfTickets(inputValue);
                                    }}
                                />
                                
                                <button 
                                    className="btn btn-light"
                                    onClick={() => setNumberOfTickets(numberOfTickets + 1)}
                                >+</button>
                            </div>
                            <h6 className="mb-3">You have to pay total <span className="text-warning">{cost * numberOfTickets}</span> for this plan</h6>
                        </form>
                    </div>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PlanDetails;