import API from "../utilities/API";

const notificationsAPI = new API('/api/v1/notifications');

export const postWebMail = (data) => {
    const result = notificationsAPI.post('/web-mail', data);
    return result;
};
