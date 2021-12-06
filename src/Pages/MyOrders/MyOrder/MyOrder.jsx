import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { updateUserBookedDB } from '../../../utilities/API';
import { backToTop } from '../../../utilities/utilities';
import { InfoModal, WarnModal } from '../../Shared/Modals/Modals';
import OrderPlaceholder from '../../Shared/OrderPlaceholder/OrderPlaceholder';

const MyOrder = props => {
    const { user, planId, orderedList, setObserveCancel } = props;
    const [planDetails, setPlanDetails] = useState({});
    const [confirmCancel, setConfirmCancel] = useState(false);
    const [showWarnModal, setShowWarnModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const orderDetails = orderedList[planId];
    const history = useHistory();

    const { title, cost } = planDetails;
    const { date, countTicket, isPending } = orderDetails;
    const bookingTimeAndDate = new Date(date);

    // time and date
    const hours = bookingTimeAndDate.getHours();
    const minutes = bookingTimeAndDate.getMinutes();
    const bookingTime = `${(hours <= 12) ? hours : (hours - 12)}:${minutes}${(hours <= 12) ? 'AM' : 'PM'}`;
    const bookingDate = `${bookingTimeAndDate.getDate()}-${bookingTimeAndDate.getMonth()}-${bookingTimeAndDate.getFullYear()}`;

    useEffect(() => {
        axios.get(`https://intense-cliffs-52842.herokuapp.com/plans/${planId}`)
            .then(res => setPlanDetails(res.data))
            .catch(error => console.warn(error))
            .then(() => setIsLoading(false));
    }, [planId]);

    useEffect(() => {
        if (confirmCancel && !!planId) {
            const tempList = { ...orderedList };
            delete tempList[planId];
            updateUserBookedDB(user, { ...tempList })
                .then(() => {
                    setObserveCancel(planId);
                })
                .catch(() => setShowFailedModal(true));
        }
    }, [confirmCancel]);

    if (isLoading) {
        return <OrderPlaceholder />
    }

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
                <div>
                    <h6>{title}</h6>
                    <p>Status: {isPending ? 'Pending' : 'Approved'} <br />
                        Tickets: {countTicket} <br />
                        Cost: {countTicket * cost || '-'} <br />
                        Orderd at {bookingDate}({bookingTime})</p>
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
                            history.push(`/plans/${planId}`)
                        }}
                    >Update</Button>
                </div>
            </div>
        </>
    );
};

export default MyOrder;