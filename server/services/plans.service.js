const validator = require("validator");
const { ObjectId } = require("mongodb");
const { db } = require("../utils/dbConnection");

exports.getAllPlansService = async (filters, queries) => {
    const plans = await db("plans").find(filters)
        .sort(queries.sortby)
        .limit(queries.limit)
        .skip(queries.skip)
        .project(queries.fields)
        .toArray();

    return plans;
};

exports.getPlanByIdService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Plan Id isn't valid");
    }

    const planData = await db("plans").findOne({
        _id: ObjectId(id)
    });

    return planData;
};

/**
 * Insert new plan on database
 * 
 * @typedef {object} Plan
 * @property {string} name - Plan title
 * @property {string} shortDescription - Plan short description
 * @property {string} description - Plan Description
 * @property {string} coverImageURL - Plan cover image 
 * @property {string[]} imageURLs - Plan images
 * @property {number} price - Coast of plan
 * @property {number} rating - Plan users rating avg
 * @property {number} tourDays - Total days of tour plan
 * @property {number} globalDiscount - In percentages
 * @property {User} manager - Manager of this plan
 * @property {[string, number] | null} promoCode - Special discount with promo code
 * @property {Date} startingDate - Starting date of tour
 * @property {'active' | 'inactive' | 'discontinued'} status - Current status of plan
 * @property {number} views - View counter
 * @property {Date} createdAt - creating time
 * @property {Date} updatedAt - updating time
 * 
 * @typedef {object} User
 * @property {ObjectId} userId - User object id of mongodb
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} contactNumber - User contact number
 * 
 * @param {Plan} data
 * @returns {object} Inserting status from mongodb
 */
exports.createNewPlanService = async (data) => {
    // validate properties
    if (!validator.isURL(data.coverImageURL)) {
        new Error("Cover image url isn't valid");
    }

    data.imageURLs.forEach(url => {
        if (!validator.isURL(url)) {
            new Error("\"" + url + "\" isn't valid url");
        }
    });

    if (!ObjectId.isValid(data.manager.userId) && !validator.isEmail(data.manager.email)) {
        new Error("Manager's data isn't valid");
    }

    // setting default value
    data.promoCode = null;
    data.status = "active";
    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

    const result = await db("plans").insertOne(data);
    return result;
};