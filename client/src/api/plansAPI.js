import API from "../utilities/API";

const planAPI = new API('/api/v1/plans');

export const getPlans = async (extension) => {
    const plans = await planAPI.get(extension || '');
    return plans;
};

export const postPlan = async (data) => {
    const plan = await planAPI.post(data);
    return plan;
};
