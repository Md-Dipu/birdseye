import axios from "axios";

// plans API
export const addPlanDB = newPlan => {
    return axios.post('https://birdeye-server.herokuapp.com/plans', newPlan);
}


// user API
export const updateUserBookedDB = (user, planTicket) => {
    return axios.put('https://birdeye-server.herokuapp.com/users', {
        user,
        planTicket
    });
}

// make a booking
export const addBookingDB = (booking) => {
    return axios.post('http://localhost:5000/bookings', booking);
}