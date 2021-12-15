import axios from "axios";

// server API url
export const APIUrl = path => 
    'https://intense-cliffs-52842.herokuapp.com' + path;

// plans API
export const addPlanDB = newPlan => {
    return axios.post(APIUrl('/plans'), newPlan);
}


// user API
export const updateUserBookedDB = (user, planTicket) => {
    return axios.put(APIUrl('/users'), {
        user,
        planTicket
    });
}