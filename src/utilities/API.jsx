import axios from "axios";

// plans API
export const addPlanDB = newPlan => {
    axios.post('http://localhost:5000/plans', newPlan)
        .then(res => alert(`Adding Status:${res.statusText} with plan id:${res.data.insertedId}`))
        .catch(error => console.warn(error));
}


// user API
export const updateUserBookedDB = (user, planTicket, additionalCallBack = () => {}, callBackValue = true) => {
    axios.put('http://localhost:5000/users', {
        user,
        planTicket
    })
        .then(res => additionalCallBack(callBackValue))
        .catch(error => console.warn(error));
}