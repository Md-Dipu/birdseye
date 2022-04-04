import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { InfoModal, WarnModal } from '../../Shared/Modals/Modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { updateBookingDB } from '../../../utilities/API';

const ManageOrder = props => {
    const { bookingData, deletedBooking } = props; console.log(bookingData);
    const [isApproved, setIsApproved] = useState(false);
    const [confirmAcion, setConfirmAction] = useState(false);
    const [showWarnModal, setShowWarnModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [forDelete, setForDelete] = useState(false);
    const [forApproval, setForApproval] = useState(false);

    // delete and approved action
    useEffect(() => {
        if (confirmAcion) {
            if (forDelete) {
                deletedBooking();
            }
            if (forApproval) {
                updateBookingDB(bookingId, {
                    isPending: false
                })
                    .then(res => {
                        if (res.data.modifiedCount)
                            setIsApproved(true);
                    })
                    .catch(console.error);
            }
        }
    }, [confirmAcion]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        _id: bookingId,
        bookingPlan: {
            title,
            cost,
            // _id: planId
        },
        date,
        countTicket,
        ordererInfo,
        isPending
    } = bookingData;

    useEffect(() => {
        setIsApproved(!isPending);
    }, [isPending]);

    // time and date
    const bookingTimeAndDate = new Date(date);
    const hours = bookingTimeAndDate.getHours();
    const minutes = bookingTimeAndDate.getMinutes();
    const bookingTime = `${(hours <= 12) ? hours : (hours - 12)}:${minutes}${(hours <= 12) ? 'AM' : 'PM'}`;
    const bookingDate = `${bookingTimeAndDate.getDate()}-${bookingTimeAndDate.getMonth()}-${bookingTimeAndDate.getFullYear()}`;

    return (
        <>
            {/* Confirmation message */}
            <WarnModal
                heading="Confirmation"
                messageText={`Are you sure to ${forApproval ? 'Approved' : ''}${forDelete ? 'Delete' : ''} order of plan "${title}"?`}
                buttonVariant="primary"
                show={showWarnModal}
                handleClose={() => {
                    setShowWarnModal(false);
                    setForDelete(false);
                    setForApproval(false);
                }}
                handleAction={() => {
                    setShowWarnModal(false);
                    setConfirmAction(true);
                }}
            />

            {/* Failed Delete message */}
            <InfoModal
                heading="Failed"
                messageText="Failed to process action. Check you internet conncetion and try again later."
                buttonVariant="danger"
                show={showFailedModal}
                handleClose={() => setShowFailedModal(false)}
            />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-light my-3 p-3 rounded">
                <div className="overflow-hidden">
                    <h6>{title}</h6>
                    <p className="text-break">
                        Orderded by: <span className="fst-italic">{ordererInfo.name}({ordererInfo.email})</span> <br />
                        Address: {ordererInfo.address} <br />
                        Tickets: {countTicket} <br />
                        Cost: <FontAwesomeIcon icon={faDollarSign} /> {countTicket * cost || '-'} <br />
                        Orderd at {bookingDate}({bookingTime}) <br />
                        <span className={`text-${!isApproved ? 'warning' : 'success'}`}>{!isApproved ? 'Pending' : 'Approved'}</span>
                    </p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button
                        variant="danger"
                        className="d-block"
                        onClick={() => {
                            setConfirmAction(false);
                            setForDelete(true);
                            setShowWarnModal(true);
                        }}
                    >Delete</Button>
                    {!isApproved && <Button
                        variant="success"
                        className="d-block mt-2"
                        onClick={() => {
                            setConfirmAction(false);
                            setForApproval(true);
                            setShowWarnModal(true);
                        }}
                    >Approved</Button>}
                </div>
            </div>
        </>
    );
};

export default ManageOrder;