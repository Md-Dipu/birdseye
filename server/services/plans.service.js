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

    const count = await db("plans").countDocuments(filters);

    return { plans, count };
};

exports.getPlanByIdService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Plan Id isn't valid");
    }

    const planData = await db("plans").findOneAndUpdate({
        _id: ObjectId(id)
    }, { $inc: { views: 1 } });

    return planData;
};

/**
 * Insert new plan on database
 * 
 * @typedef {object} Plan
 * @property {string} name - Plan title
 * @property {string} shortDescription - Plan short description
 * @property {Description[]} description - Plan Description
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
 * @typedef Description
 * @property {string} title - Title of description
 * @property {string} contentText - Description details text
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

    // setting default value
    data.description = [];
    data.rating = 0;
    data.promoCode = null;
    data.status = "active";
    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

    const result = await db("plans").insertOne(data);
    return result;
};

/**
 * Update Plan data on database
 * 
 * @param {Plan} data 
 * @returns {object} Updating status
 */
exports.updatePlanByIdService = async (id, data) => {
    data.imageURLs?.forEach(url => {
        if (!validator.isURL(url)) {
            new Error("\"" + url + "\" isn't valid url");
        }
    });

    if (data.manager) {
        if (!ObjectId.isValid(data.manager.userId) && !validator.isEmail(data.manager.email)) {
            new Error("Manager's data isn't valid");
        }
    }

    data.updatedAt = new Date();
    const result = await db("plans").updateOne({ _id: ObjectId(id) }, { $set: data });
    return result;
};

/**
 * Delete plan from database
 * 
 * @param {string} id - Object id string of plan document
 * @returns {object} Deleting status 
 */
exports.deletePlanByIdService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Plan ID isn't valid");
    }

    const result = await db("plans").deleteOne({ _id: ObjectId(id) });
    return result;
};