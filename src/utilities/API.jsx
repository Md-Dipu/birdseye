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