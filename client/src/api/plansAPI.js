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

export const updatePlanCoverImageURLById = async (id, url) => {
    const result = await planAPI.patch(`/${id}`, {
        coverImageURL: url
    });

    return result;
};

export const updatePlanStatusById = async (id, status) => {
    const result = await planAPI.patch(`/${id}`, {
        status
    });

    return result;
};

export const updateManagerId = async (id, manager) => {
    const result = await planAPI.patch(`/${id}`, {
        manager
    });

    return result;
};

export const deletePlan = async (id) => {
    const result = await planAPI.delete(`/${id}`);
    return result;
};
