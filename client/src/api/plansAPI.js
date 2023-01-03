import API from "../utilities/API";

const planAPI = new API('/api/v1/plans');

const getPlans = async (extension) => {
    const plans = await planAPI.get(extension || '');
    return plans;
};

export { getPlans };