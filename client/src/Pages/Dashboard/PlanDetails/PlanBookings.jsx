import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getBookings } from '../../../api/bookingsAPI';
import Loading from '../../Shared/Loading/Loading';
import BookingDetails from './BookingDetails';

const PlanBookings = ({ planId, filter }) => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showBooking, setShowBooking] = useState(null);
    const [updateBookings, setUpdateBookings] = useState(0);

    useEffect(() => {
        let queryText = '';
        if (filter === 'cancelation') {
            queryText += '&cancelation.requestSended=true';
        } else if (filter === 'canceled') {
            queryText += '&cancelation.requestApproved=true';
        } else if (filter === 'paid') {
            queryText += '&payment[not][type]=10';
        }

        setIsLoading(true);
        getBookings(`?planId=${planId}${queryText}`)
            .then(res => res.data.data.map(data => {
                data.discountAmount = (data.price * data.quantity) - data.payableAmount;
                return data;
            }))
            .then(data => setBookings(data))
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, [filter, planId, updateBookings]);

    return (
        <>
            {isLoading ? <Loading height="60" /> :
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Payable</th>
                            <th>Discount</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => <tr onClick={() => setShowBooking(booking._id)}>
                            <td>{index + 1}</td>
                            <td>{booking.user?.name}</td>
                            <td>${booking.price}</td>
                            <td>{booking.quantity}</td>
                            <td>${booking.payableAmount?.toFixed(2)}</td>
                            <td>${booking.discountAmount?.toFixed(2)}</td>
                            <td>{booking.payment ? <span className="text-success">${booking.payment.amount}</span> : '-'}</td>
                        </tr>)}
                    </tbody>
                </Table>}
            {showBooking && <BookingDetails
                id={showBooking}
                onClose={() => setShowBooking(null)}
                onDelete={() => setUpdateBookings(updateBookings + 1)}
            />}
        </>
    );
};

export default PlanBookings;