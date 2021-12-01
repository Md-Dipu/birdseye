import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { updateUserBookedDB } from '../../utilities/API';

const PlanDetails = () => {
    const [plan, setPlan] = useState({});
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [currentOrderedList, setCurrentOrderedList] = useState({});
    const [planExist, setPlanExist] = useState(false);
    const { planId } = useParams();
    const { user } = useAuth();

    const { _id, title, description, img_url, rating, tourDays, cost, starting_date } = plan;

    useEffect(() => {
        axios.get(`http://localhost:5000/plans/${planId}`)
            .then(res => setPlan(res.data))
            .catch(error => console.warn(error));
    }, [planId]);

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${user?.email}`)
            .then(res => setCurrentOrderedList(res.data.ordered))
            .catch(error => console.warn(error));
    }, [user]);

    useEffect(() => {
        const exists = currentOrderedList[_id];
        if(exists) {
            setPlanExist(true);
            setNumberOfTickets(exists);
        }
    }, [currentOrderedList, _id]);
    
    return (
        <Container>
            <Row xs={1} lg={2} className="my-3">
                <Col>
                    <Image src={img_url} className="w-100" />
                    <div className="my-3">
                        <h4>{title}</h4>
                        <p>{description}</p>
                    </div>
                </Col>
                
                <Col classNam="my-3">
                    <h5>Book ticket for this plan</h5>
                    {/* Details Table */}
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
                    {/* Ticket input and book action */} 
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
                        <h6 className="mb-3">You have to pay total <span className="text-warning">{(cost * numberOfTickets) || 0}</span> for this plan</h6>
                        <Button 
                            variant="warning"
                            onClick={() => {
                                const bookedTicket = {}
                                bookedTicket[_id] = numberOfTickets;
                                updateUserBookedDB(user, {...currentOrderedList, ...bookedTicket}, setPlanExist);
                            }}
                        >{planExist ? 'Update now' : 'Book now'}</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default PlanDetails;