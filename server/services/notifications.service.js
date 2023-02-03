const { ObjectId } = require("mongodb");
const { db } = require("../utils/dbConnection");

/**
 * Insert new notification on db
 * 
 * @typedef {object} Notification
 * @property {SendTo} to - reviewable user or users identities 
 * @property {'web-mail' | 'role-request' | 'confirmation' | 'error'} type - notification type
 * @property {string} title - notification title 
 * @property {string} message - notification message 
 * @property {string[]} seenBy - object id of users
 * @property {Date} createdAt - creating time
 * @property {Date} updatedAt - updating time
 * 
 * @typedef {object} SendTo
 * @property {'role' | 'user'} showBy - show by role or id or specific users
 * @property {string[]} ids - array of object id
 * @property {string[]} roles - array of allowed role
 * 
 * @param {Notification} data 
 * @returns Inserting status from mongodb
 */
exports.createNotificationService = async (data) => {
    data.seenBy = [];
    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

    if (data.to.ids) {
        data.to.ids.forEach(id => {
            if (!ObjectId.isValid(id)) {
                throw new Error("Receivers ids aren't valid");
            }
        });
    }

    const result = await db("notifications").insertOne(data);
    return result;
};
