import API from "../utilities/API";

const bookingAPI = new API('/api/v1/bookings');

export const createBooking = async (data) => {
    const booking = bookingAPI.post(data);
    return booking;
};
