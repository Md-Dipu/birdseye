import API from "../utilities/API";

const bookingAPI = new API('/api/v1/bookings');

export const createBooking = async (data) => {
    const booking = bookingAPI.post(data);
    return booking;
};

export const getBookings = async (extension) => {
    const bookings = await bookingAPI.get(extension || '');
    return bookings;
};

export const getBookingById = async (bookingId) => {
    const booking = await bookingAPI.get(`/${bookingId}`);
    return booking;
};

export const sendBookingCancelRequest = async (bookingId) => {
    const result = await bookingAPI.patch(`/${bookingId}`, {
        cancelation: {
            requestSended: true
        }
    });

    return result;
};

export const approveBookingCancelRequest = async (bookingId) => {
    const result = await bookingAPI.patch(`/${bookingId}`, {
        cancelation: {
            requestApproved: true
        }
    });

    return result;
};

export const deleteBookingById = async (bookingId) => {
    const result = await bookingAPI.delete(`/${bookingId}`);
    return result;
};
