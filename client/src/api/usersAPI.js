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

export const getUsers = async (extension) => {
    const users = await userAPI.get(extension || '');
    return users;
};

export const updateUserById = async (userId, data) => {
    const result = await userAPI.patch(`/id/${userId}`, data);
    return result;
};

export const deleteUserById = async (userId) => {
    const result = await userAPI.delete(`/id/${userId}`);
    return result;
};
