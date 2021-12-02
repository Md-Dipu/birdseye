import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { updateUserBookedDB } from '../../../utilities/API';

const MyOrder = props => {
    const { user, planId, orderedList, setIsCanceled } = props;
    const [planDetails, setPlanDetails] = useState({});
    const orderDetails = orderedList[planId];

    const { title } = planDetails;
    const { date, isPending } = orderDetails;
    const bookingTimeAndDate = new Date(date);

    // time and date
    const hours = bookingTimeAndDate.getHours();
    const minutes = bookingTimeAndDate.getMinutes();
    const bookingTime = `${(hours <= 12) ? hours : (hours - 12)}:${minutes}${(hours <= 12) ? 'AM' : 'PM'}`;
    const bookingDate = `${bookingTimeAndDate.getDate()}-${bookingTimeAndDate.getMonth()}-${bookingTimeAndDate.getFullYear()}`;

    useEffect(() => {
        axios.get(`http://localhost:5000/plans/${planId}`)
            .then(res => setPlanDetails(res.data))
            .catch(error => console.warn(error));
    }, [planId]);

    return (
        <div className="d-flex justify-space-between align-items-center bg-light my-3 p-3 rounded">
            <div>
                <h6>{title}</h6>
                <p>Status: {isPending ? 'Pending' : 'Apporoved'} <br />
                    Orderd at {bookingTime}, {bookingDate}</p>
            </div>
            <Button 
                variant="warning"
                onClick={() => {
                    delete orderedList[planId];
                    updateUserBookedDB(user, { ...orderedList }, setIsCanceled);
                }}
            >Cancel Booking</Button>
        </div>
    );
};

export default MyOrder;