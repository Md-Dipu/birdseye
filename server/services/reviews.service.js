const { ObjectId } = require("mongodb");
const validator = require("validator");
const { db } = require("../utils/dbConnection");

/**
 * Update plan rating
 * 
 * @typedef {object} ReviewQueryObject
 * @property {"site" | "plan" | "manager"} to 
 * @property {string} planId
 * 
 * @param {ReviewQueryObject} query 
 * @returns Updating response from db
 */
const updatePlanRating = async (query) => {
    const ratings = await db("reviews")
        .find(query)
        .project({
            rating: 1
        })
        .toArray();

    const totalRatings = ratings.reduce((previous, current) => previous + current.rating, 0);
    const count = await db("reviews").countDocuments(query);
    const avg = totalRatings / count;

    const result = await db("plans").updateOne({ _id: ObjectId(query.planId) }, { "$set": { rating: avg } });
    return result;
};

/**
 * Insert review on database
 * 
 * @typedef {object} Review
 * @property {"site" | "plan" | "manager"} to - Website review or plan
 * @property {string} planId - Reviewed plan id
 * @property {string} managerId - Reviewed manager id
 * @property {string} message - Review message
 * @property {number} rating - Review rating out of 5
 * @property {User} user - Reviewer user
 * @property {Date} createdAt - Creating time 
 * @property {Date} updatedAt - Updating time 
 * 
 * @typedef {object} User
 * @property {string} id - User ObjectId
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

    // checking existence 
    let query = { to: data.to };
    if (data.to === "plan") {
        query.planId = data.planId;
    } else if (data.to === "manager") {
        query.managerId === data.managerId;
    }

    if (await db("reviews").countDocuments({ ...query, "user.id": data.user.id }) > 0) {
        throw new Error("Already reviewed by user:" + data.user.id);
    }

    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

    const result = await db("reviews").insertOne(data);

    // updating average rating of plan after posting new review
    if (query.to === "plan") {
        await updatePlanRating(query);
    }

    return result;
};

exports.getReviewsService = async (filters, queries) => {
    const reviews = await db("reviews").find(filters)
        .sort(queries.sortby)
        .limit(queries.limit)
        .skip(queries.skip)
        .project(queries.fields)
        .toArray();

    const count = await db("reviews").countDocuments(filters);

    return { reviews, count };
};
