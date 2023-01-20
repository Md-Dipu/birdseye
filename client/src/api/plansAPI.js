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

export const getPlanById = async (id) => {
    const plan = await planAPI.get(`/${id}`);
    return plan;
};

export const updatePlanById = async (id, data) => {
    const result = await planAPI.patch(`/${id}`, data);
    return result;
};

export const updatePlanDescriptionById = async (id, data) => {
    const result = await planAPI.patch(`/${id}`, {
        description: data
    });

    return result;
};
