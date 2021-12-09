import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { updateUserBookedDB } from '../../utilities/API';
import { InfoModal, WarnModal } from '../Shared/Modals/Modals';

const PlaceOrder = () => {
    const [plan, setPlan] = useState({});
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [currentOrderedList, setCurrentOrderedList] = useState({});
    const [planExist, setPlanExist] = useState(false);
    const [showWarnModal, setShowWarnModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [confirmOrder, setComfirmOrder] = useState(false);
    const { planId } = useParams();
    const { user } = useAuth();

    // orderer information
    const [ordererName, setOrdererName] = useState(user.displayName);
    const [ordererEmail, setOrdererEmail] = useState(user.email);
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const { _id, title, description, img_url, rating, tourDays, cost, starting_date } = plan;

    // handle submission
    const handleSubmit = e => {
        setComfirmOrder(false);
        setShowWarnModal(true);
        e.preventDefault();
    }

    useEffect(() => {
        axios.get(`https://intense-cliffs-52842.herokuapp.com/plans/${planId}`)
            .then(res => setPlan(res.data))
            .catch(error => console.warn(error));
    }, [planId]);

    useEffect(() => {
        axios.get(`https://intense-cliffs-52842.herokuapp.com/users/${user?.email || ''}`)
            .then(res => setCurrentOrderedList(res.data.ordered || {}))
            .catch(error => console.warn(error));
    }, [user]);

    useEffect(() => {
        const exists = currentOrderedList[_id];
        if(exists) {
            setPlanExist(true);
            setNumberOfTickets(exists.countTicket);
        }
        else {
            setPlanExist(false);
        }
    }, [currentOrderedList, _id]);

    // confirmation action
    useEffect(() => {
        if (confirmOrder) {
            const time = new Date();
            const bookedTicket = {}
            bookedTicket[_id] = {
                date: time,
                countTicket: numberOfTickets,
                ordererInfo: { name: ordererName, email: ordererEmail, address: deliveryAddress },
                isPending: true
            };
            updateUserBookedDB(user, {...currentOrderedList, ...bookedTicket})
                .then(res => {
                    setShowSuccessModal(true);
                    setPlanExist(true);
                })
                .catch(error => setShowFailedModal(true));
        }
    }, [confirmOrder]);
    
    return (
        <>
            {/* Confirmation Modal */}
            <WarnModal
                heading="Confirmation"
                messageText={`Are you sure to ${ planExist ? 'update infomation to' : 'book'} ${numberOfTickets} tickets for plan "${title}"?`}
                buttonVariant="primary"
                show={showWarnModal}
                handleClose={() => setShowWarnModal(false)}
                handleAction={() => {
                    setComfirmOrder(true);
                    setShowWarnModal(false);
                }}
            />

            {/* Show success message */}
            <InfoModal 
                heading="Success"
                messageText="Process have completed successfully."
                buttonVariant="success"
                show={showSuccessModal}
                handleClose={() => setShowSuccessModal(false)}
            />
            
            {/* Show Failed message */}
            <InfoModal 
                heading="Failed"
                messageText="Process have failed to complete."
                buttonVariant="danger"
                show={showFailedModal}
                handleClose={() => setShowFailedModal(false)}
            />

            <Container>
                <Row xs={1} lg={2} className="my-3">
                    <Col>
                        <Image src={img_url} className="w-100" />
                        <div className="my-3">
                            <h4>{title}</h4>
                            <p>{description}</p>
                        </div>
                        {/* Details Table */}
                        <h5>Details</h5>
                        <table className="table my-3">
                            <tbody>
                                <tr className="border-top">
                                    <th scope="row">Cost</th>
                                    <td><FontAwesomeIcon icon={faDollarSign} /> {cost}</td>
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
                    </Col>
                    
                    <Col className="my-3">
                        <h5 className="text-center text-uppercase"><span className="text-info">Book ticket</span> for this plan</h5>
                        {/* Ticket input and book action */} 
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="orderer-name">Name<span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="orderer-name" 
                                    value={ordererName} 
                                    onChange={e => setOrdererName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="orderer-email">Email<span className="text-danger">*</span></label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="orderer-email" 
                                    value={ordererEmail} 
                                    onChange={e => setOrdererEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="delivery-address">Address<span className="text-danger">*</span></label>
                                <textarea 
                                    className="form-control" 
                                    name="delivery-address" 
                                    value={deliveryAddress} 
                                    rows="8"
                                    onChange={e => setDeliveryAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <label className="form-label" htmlFor="number-of-tickets">How much ticket you need?</label>
                            <div className="input-group mb-3" style={{ width: '10rem' }}>
                                <button 
                                    type="button"
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
                                    onBlur={e => {
                                        const inputValue = parseInt(e.target.value);
                                        (inputValue < 1) ?
                                        setNumberOfTickets(1) :
                                        setNumberOfTickets(inputValue);
                                    }}
                                />
                                
                                <button 
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => setNumberOfTickets(numberOfTickets + 1)}
                                >+</button>
                            </div>
                            <h6 className="mb-3">You have to pay total <span className="text-warning">{(cost * numberOfTickets) || 0}</span> for this plan</h6>
                            <Button variant="warning" type="submit" >{planExist ? 'Update now' : 'Book now'}</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PlaceOrder;