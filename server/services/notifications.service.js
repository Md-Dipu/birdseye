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
 * @property {Request} requestData - request sended data
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
 * @typedef {object} Request 
 * @property {string} userId - document object id of request sender user
 * @property {string} role - requested role
 * 
 * @param {Notification} data 
 * @returns Inserting status from mongodb
 */
exports.createNotificationService = async (data) => {
    if (data.to.ids) {
        data.to.ids.forEach(id => {
            if (!ObjectId.isValid(id)) {
                throw new Error("Receivers ids aren't valid");
            }
        });
    }

    if (data.from) {
        if (!validator.isEmail(data.from.email)) {
            throw new Error("Email isn't valid");
        }
    }

    data.seenBy = [];
    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

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
        to: {
            sendBy: "role",
            roles: ["admin"]
        },
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

/**
 * @typedef {object} Query 
 * @property {number} limit - limit per page 
 * @property {number} page - page number
 * @property {number} skip - number skipping documents
 * @property {*} fields - projection fields
 * 
 * @param {*} filters
 * @param {Query} queries 
 * @returns {object} Find status from database
 */
exports.getNotificationsService = async (filters, queries) => {
    const notifications = await db("notifications").find(filters)
        .sort(queries.sortby)
        .limit(queries.limit)
        .skip(queries.skip)
        .project(queries.fields)
        .toArray();

    const count = await db("notifications").countDocuments(filters);

    return { notifications, count };
};

/** 
 * @param {string} id - object id of document
 * @returns {object} Document
 */
exports.getNotificationByIdService = async (id, userId) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Notification Id isn't valid");
    }
    const filter = { _id: ObjectId(id) };
    const notification = await db("notifications").findOne(filter);
    if (!notification.seenBy.includes(userId)) {
        await db("notifications").updateOne(filter, {
            $push: { seenBy: userId },
            $set: { updatedAt: new Date() }
        });
    }

    return notification;
};
