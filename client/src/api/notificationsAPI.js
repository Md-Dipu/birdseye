import API from "../utilities/API";

const notificationsAPI = new API('/api/v1/notifications');

export const postWebMail = async (data) => {
    const result = await notificationsAPI.post('/web-mail', data);
    return result;
};

export const roleRequest = async (message, data) => {
    const result = await notificationsAPI.post({
        to: {
            sendBy: 'role',
            roles: ['admin']
        },
        type: 'role-request',
        requestData: data,
        title: 'Role request',
        message
    });

    return result;
};

export const getNotifications = async (extension) => {
    const result = notificationsAPI.get(extension || '');
    return result;
};

export const getNotificationById = async (id) => {
    const result = notificationsAPI.get(`/${id}`);
    return result;
};
