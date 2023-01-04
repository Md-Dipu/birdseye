import API from "../utilities/API";

const userAPI = new API('/api/v1/users');

export const createUser = async (data) => {
    console.log(data);
    const user = await userAPI.post(data);
    return user;
};
