import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import OrderPlaceholder from '../../Shared/OrderPlaceholder/OrderPlaceholder';
import { updateUserBookedDB } from '../../../utilities/API';

const ManageOrder = props => {
    const { user, order, setObserveDelete } = props;
    const { id, from, countTicket, isPending, date } = order;
    const bookingTimeAndDate = new Date(date);
    const { ordered: orderedList } = user;
    const [orderDetails, setOrderDetails] = useState({});
    const [isApproved, setIsApproved] = useState(!isPending);
    const [isLoading, setIsLoading] = useState(true);

    const { title, cost } = orderDetails;
    // time and date
    const hours = bookingTimeAndDate.getHours();
    const minutes = bookingTimeAndDate.getMinutes();
    const bookingTime = `${(hours <= 12) ? hours : (hours - 12)}:${minutes}${(hours <= 12) ? 'AM' : 'PM'}`;
    const bookingDate = `${bookingTimeAndDate.getDate()}-${bookingTimeAndDate.getMonth()}-${bookingTimeAndDate.getFullYear()}`;
    
    useEffect(() => {
        axios.get(`https://intense-cliffs-52842.herokuapp.com/plans/${id}`)
            .then(res => setOrderDetails(res.data))
            .catch(error => console.warn(error))
            .then(() => setIsLoading(false));
    }, [id]);

    if (isLoading) {
        return <OrderPlaceholder />;
    }
    
    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-light my-3 p-3 rounded">
            <div>
                <h6>{title}</h6>
                <p><span className="fst-italic">from: {from}</span> <br />
                    Tickets: {countTicket} <br />
                    Cost: {countTicket * cost || '-'} <br />
                    Orderd at {bookingDate}({bookingTime}) <br />
                    <span className={`text-${isPending ? 'warning' : 'success'}`}>{!isApproved ? 'Pending' : 'Approved'}</span></p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Button 
                    variant="danger"
                    className="d-block"
                    onClick={() => {
                        if (id) {
                            delete orderedList[id];
                            updateUserBookedDB(user, { ...orderedList }, [setObserveDelete], [id]);
                        }
                    }}
                >Delete</Button>
                {isPending && <Button
                    variant="success"
                    className="d-block mt-2"
                    onClick={() => {
                        if (id) {
                            orderedList[id].isPending = false;
                            updateUserBookedDB(user, { ...orderedList }, [setIsApproved], [true]);
                        }
                    }}
                >Approved</Button>}
            </div>
        </div>
    );
};

export default ManageOrder;