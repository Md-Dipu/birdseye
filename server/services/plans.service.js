const { ObjectId } = require("mongodb");
const { db } = require("../utils/dbConnection");

exports.getAllPlansService = async () => {
    const plans = await db("plans").find({}).toArray();
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
 * @typedef {object} plan
 * @property {string} title - Plan title
 * @property {string} description - Plan Description
 * @property {string} imageURL - Plan front image url
 * @property {number} rating - Plan user rating
 * @property {number} tourDays - Total days of tour plan
 * @property {number} cost - Coast of plan
 * @property {data} startingDare - Starting date of tour
 * 
 * @param {plan} data
 */
exports.createNewPlanService = async (data) => {
    const result = await db("plans").insertOne(data);
    return result;
};