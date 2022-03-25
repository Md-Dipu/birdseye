import React, { useEffect, useState } from 'react';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { backToTop } from '../../../utilities/utilities';
import { InfoModal, WarnModal } from '../../Shared/Modals/Modals';
import { deleteBookingDB } from '../../../utilities/API';

const MyOrder = props => {
    const { bookingData, bookingCanceled } = props;
    const [confirmCancel, setConfirmCancel] = useState(false);
    const [showWarnModal, setShowWarnModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const history = useHistory();

    const {
        bookingPlan: {
            title,
            cost,
            _id: bookingId
        },
        date,
        countTicket,
        ordererInfo,
        isPending
    } = bookingData;

    // time and date
    const bookingTimeAndDate = new Date(date);
    const hours = bookingTimeAndDate.getHours();
    const minutes = bookingTimeAndDate.getMinutes();
    const bookingTime = `${(hours <= 12) ? hours : (hours - 12)}:${minutes}${(hours <= 12) ? 'AM' : 'PM'}`;
    const bookingDate = `${bookingTimeAndDate.getDate()}-${bookingTimeAndDate.getMonth()}-${bookingTimeAndDate.getFullYear()}`;

    // Cancel order
    useEffect(() => {
        if (confirmCancel) {
            deleteBookingDB(bookingData._id)
                .then(({ data: { deletedCount } }) => deletedCount && bookingCanceled())
                .catch(console.warn);
        }
    }, [confirmCancel]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {/* Confirmation Modal */}
            <WarnModal
                heading="Confirmation"
                messageText={`Are you sure to cancel order for ${title}?`}
                buttonVariant="primary"
                show={showWarnModal}
                handleClose={() => setShowWarnModal(false)}
                handleAction={() => {
                    setConfirmCancel(true);
                    setShowWarnModal(false);
                }}
            />

            {/* Failed Delete message */}
            <InfoModal
                heading="Failed"
                messageText={`Cancel order request  for "${title}" isn't done maybe for network conncetion. Check connection and try again later.`}
                buttonVariant="danger"
                show={showFailedModal}
                handleClose={() => setShowFailedModal(false)}
            />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-light my-3 p-3 rounded">
                <div className="overflow-hidden">
                    <h6>{title}</h6>
                    <p className="text-break">
                        Status: <span className={`text-${isPending ? 'warning' : 'success'}`}>{isPending ? 'Pending' : 'Approved'}</span> <br />
                        Ordered by: <span className="fst-italic">{ordererInfo.name}({ordererInfo.email})</span> <br />
                        Address: {ordererInfo.address} <br />
                        Tickets: {countTicket} <br />
                        Cost: <FontAwesomeIcon icon={faDollarSign} /> {countTicket * cost || '-'} <br />
                        Orderd at {bookingDate}({bookingTime})
                    </p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button
                        variant="warning"
                        className="d-block mb-2"
                        onClick={() => {
                            setConfirmCancel(false);
                            setShowWarnModal(true);
                        }}
                    >Cancel Booking</Button>
                    <Button
                        variant="info"
                        className="d-block"
                        onClick={() => {
                            backToTop();
                            history.push(`/plans/${bookingId}`)
                        }}
                    >Update</Button>
                </div>
            </div>
        </>
    );
};

export default MyOrder;