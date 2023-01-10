const { ObjectId } = require("mongodb");
const validator = require("validator");
const { db } = require("../utils/dbConnection");

/**
 * Insert review on database
 * 
 * @typedef {object} Review
 * @property {"site" | "plan" | "manager"} to - Website review or plan
 * @property {ObjectId} planId - Reviewed plan id
 * @property {ObjectId} managerId - Reviewed manager id
 * @property {string} message - Review message
 * @property {number} rating - Review rating out of 5
 * @property {User} user - Reviewer user
 * @property {Date} createdAt - Creating time 
 * @property {Date} updatedAt - Updating time 
 * 
 * @typedef {object} User
 * @property {ObjectId} id - User ObjectId
 * @property {string} name - User name
 * @property {string} email - User unique email address
 * 
 * @param {Review} data 
 */
exports.createNewReviewService = async (data) => {
    if (!ObjectId.isValid(data.user.id) || !validator.isEmail(data.user.email)) {
        throw new Error("User id or email isn't valid");
    }

    if (data.to === "plan" && !ObjectId.isValid(data.planId)) {
        throw new Error("Plan id isn't valid");
    }

    if (data.to === "manager" && !ObjectId.isValid(data.managerId)) {
        throw new Error("Manager id isn't valid");
    }

    if (await db("reviews").countDocuments({ "user.id": data.user.id }) > 0) {
        throw new Error("Already reviewed by user:" + data.user.id);
    }

    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

    const result = db("reviews").insertOne(data);
    return result;
};
