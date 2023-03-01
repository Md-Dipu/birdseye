import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getBookings } from '../../../api/bookingsAPI';
import Loading from '../../Shared/Loading';
import Pagination from '../../Shared/Pagination';
import BookingDetails from './BookingDetails';

const PlanBookings = ({ planId, filter }) => {
    const [bookings, setBookings] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showBooking, setShowBooking] = useState(null);
    const [updateBookings, setUpdateBookings] = useState(0);

    const limit = 12;

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
        getBookings(`?planId=${planId}&limit=${limit}&page=${currentPage}${queryText}&fields=price,quantity,payableAmount,user.name,payment.amount`)
            .then(res => {
                if (res.data.data.length === 0) {
                    setTimeout(() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        }
                    });
                }

                setTotalBookings(res.data.count);
                return res.data.data.map(data => {
                    data.discountAmount = (data.price * data.quantity) - data.payableAmount;
                    return data;
                })
            })
            .then(data => setBookings(data))
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, [currentPage, filter, planId, updateBookings]);

    return (
        <>
            {isLoading ? <Loading height="60" /> :
                <Table striped hover responsive>
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
                        {bookings.map((booking, index) => <tr key={booking._id} onClick={() => setShowBooking(booking._id)}>
                            <td>{index + 1 + (limit * (currentPage - 1))}</td>
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
            {totalBookings > limit && <Pagination
                numberOfButtons={Math.ceil(totalBookings / limit)}
                currentPage={currentPage}
                onClick={(page) => setCurrentPage(page)}
            />}
        </>
    );
};

export default PlanBookings;