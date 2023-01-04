import API from "../utilities/API";

const userAPI = new API('/api/v1/users');

export const createUser = async (data) => {
    const user = await userAPI.post(data);
    return user;
};

export const getUserByEmail = async (email) => {
    const user = await userAPI.get(`/${email}`);
    return user;
};
