const validator = require("validator");
const { ObjectId } = require("mongodb");
const { db } = require("../utils/dbConnection");

/**
 * Insert new notification on db
 * 
 * @typedef {object} Notification
 * @property {SendTo} to - viewable user or users identities 
 * @property {SendFrom | null} from - sender identity
 * @property {'web-mail' | 'role-request' | 'confirmation' | 'error'} type - notification type
 * @property {string} title - notification title 
 * @property {string} message - notification message 
 * @property {string[]} seenBy - object id of users
 * @property {Date} createdAt - creating time
 * @property {Date} updatedAt - updating time
 * 
 * @typedef {object} SendTo
 * @property {'role' | 'user'} sendBy - show by role or id or specific users
 * @property {string[]} ids - array of object id
 * @property {string[]} roles - array of allowed role
 * 
 * @typedef {object} SendFrom
 * @property {string} name - name of sender
 * @property {string} email - email address of sender
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

/**
 * Insert new web-mail
 * 
 * @typedef {object} WebMail
 * @property {string} name - sender name
 * @property {string} email - sender email
 * @property {string} message - message
 * 
 * @param {WebMail} data 
 * @returns 
 */
exports.createAnonymousWebMailService = async (data) => {
    if (!validator.isEmail(data.email)) {
        throw new Error("Email isn't valid");
    }

    /** 
     * @type {Notification} 
     * @description new data for insert operation
     */
    const webMail = {
        to: "admin",
        from: {
            name: data.name,
            email: data.email
        },
        type: "web-mail",
        message: data.message,
        seenBy: []
    };

    webMail.createdAt = new Date();
    webMail.updatedAt = webMail.createdAt;

    const result = await db("notifications").insertOne(webMail);
    return result;
};
