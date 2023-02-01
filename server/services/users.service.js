const { ObjectId } = require("mongodb");
const validator = require("validator");
const { db } = require("../utils/dbConnection");

/**
 * Insert user on database
 * 
 * @typedef {object} User
 * @property {string} name - User name
 * @property {string} email - User unique email address
 * @property {string} contactNumber - User contact number
 * @property {string} imageURL - User picture url
 * @property {Date} birthDate - User birth date
 * @property {string} profession - User profession
 * @property {[string, string][]} addresses - User addresses array
 * @property {"admin" | "manager" | "user"} role - User role
 * @property {Date} createdAt - Creating time 
 * @property {Date} updatedAt - Updating time 
 * 
 * @param {User} data
 * @returns {object} Inserting response from mongodb
 */
exports.createNewUserService = async (data) => {
    data.role = "user";
    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

    if (!validator.isEmail(data.email) || await db("users").countDocuments({ email: data.email }) !== 0) {
        throw new Error("Email address isn't valid or this email address already exists.");
    }

    const result = await db("users").insertOne(data);
    return result;
};

/**
 * Update user 
 * 
 * @param {ObjectId} id - User mongodb ObjectId
 * @param {User} data - Updating data
 * @returns {object} Updating response from mongodb
 */
exports.updateUserByIdService = async (id, data) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("ObjectId isn't valid.");
    }

    data.updatedAt = new Date();
    const result = await db("users").updateOne({ _id: ObjectId(id) }, { $set: data });
    return result;
};

exports.getUserByEmailService = async (email) => {
    const user = await db("users").findOne({ email });

    if (user === null) {
        throw new Error("User doesn't exists or email is wrong");
    }

    return user;
};

exports.getUsersService = async (filters, queries) => {
    const users = await db("users").find(filters)
        .sort(queries.sortby)
        .limit(queries.limit)
        .skip(queries.skip)
        .project(queries.fields)
        .toArray();

    const count = await db("users").countDocuments(filters);

    return { users, count };
};

/**
 * Delete user from database
 * 
 * @param {string} id - Object id string of mongodb document
 * @returns {object} Deleting status of mongodb
 */
exports.deleteUserByIdService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Object Id isn't valid");
    }

    const result = await db("users").deleteOne({ _id: ObjectId(id) });
    return result;
};
