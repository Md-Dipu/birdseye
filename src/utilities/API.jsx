import axios from "axios";

// plans API
export const addPlanDB = newPlan => {
    axios.post('https://intense-cliffs-52842.herokuapp.com/plans', newPlan)
        .then(res => alert(`Adding Status:${res.statusText} with plan id:${res.data.insertedId}`))
        .catch(error => console.warn(error));
}


// user API
export const updateUserBookedDB = (user, planTicket, additionalCallBack = () => {}, callBackValue = true) => {
    axios.put('https://intense-cliffs-52842.herokuapp.com/users', {
        user,
        planTicket
    })
        .then(res => additionalCallBack(callBackValue))
        .catch(error => console.warn(error));
}