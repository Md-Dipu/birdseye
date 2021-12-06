import axios from "axios";

// plans API
export const addPlanDB = newPlan => {
    return axios.post('https://intense-cliffs-52842.herokuapp.com/plans', newPlan);
}


// user API
export const updateUserBookedDB = (user, planTicket) => {
    return axios.put('https://intense-cliffs-52842.herokuapp.com/users', {
        user,
        planTicket
    });
}