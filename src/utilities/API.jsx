import axios from "axios";

export const addPlanDB = newPlan => {
    axios.post('http://localhost:5000/plans', newPlan)
        .then(res => alert(`Adding Status:${res.statusText} with plan id:${res.data.insertedId}`))
        .catch(error => console.warn(error));
}