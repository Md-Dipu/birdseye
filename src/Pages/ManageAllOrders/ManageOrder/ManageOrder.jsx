import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import OrderPlaceholder from '../../Shared/OrderPlaceholder/OrderPlaceholder';
import { updateUserBookedDB } from '../../../utilities/API';
import { InfoModal, WarnModal } from '../../Shared/Modals/Modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const ManageOrder = props => {
    const { user, order, setObserveDelete } = props;
    const { id, ordererInfo, countTicket, isPending, date } = order;
    const bookingTimeAndDate = new Date(date);
    const { ordered: orderedList } = user;
    const [orderDetails, setOrderDetails] = useState({});
    const [isApproved, setIsApproved] = useState(!isPending);
    const [confirmAcion, setConfirmAction] = useState(false);
    const [showWarnModal, setShowWarnModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [forDelete, setForDelete] = useState(false);
    const [forApproval, setForApproval] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { title, cost } = orderDetails;
    // time and date
    const hours = bookingTimeAndDate.getHours();
    const minutes = bookingTimeAndDate.getMinutes();
    const bookingTime = `${(hours <= 12) ? hours : (hours - 12)}:${minutes}${(hours <= 12) ? 'AM' : 'PM'}`;
    const bookingDate = `${bookingTimeAndDate.getDate()}-${bookingTimeAndDate.getMonth()}-${bookingTimeAndDate.getFullYear()}`;

    useEffect(() => {
        axios.get(`https://birdeye-server.herokuapp.com/plans/${id}`)
            .then(res => setOrderDetails(res.data))
            .catch(error => console.warn(error))
            .then(() => setIsLoading(false));
    }, [id]);

    // delete and approval action
    useEffect(() => {
        if (confirmAcion && !!id) {
            if (forDelete) {
                delete orderedList[id];
                updateUserBookedDB(user, { ...orderedList })
                    .then(() => setObserveDelete(id))
                    .catch(() => setShowFailedModal(true));
                setForDelete(false);
            }
            else if (forApproval) {
                orderedList[id].isPending = false;
                updateUserBookedDB(user, { ...orderedList })
                    .then(() => setIsApproved(true))
                    .catch(() => {
                        setShowFailedModal(true);
                        setIsApproved(false);
                    });
                setForApproval(false);
            }
        }
    }, [confirmAcion]);

    useEffect(() => {
        setIsApproved(!isPending);
    }, [isPending]);

    if (isLoading) {
        return <OrderPlaceholder />;
    }

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