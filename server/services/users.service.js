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

    if (!data.email || await db("users").find({ email: data.email }).count() !== 0) {
        throw new Error("Email address isn't valid or this email address already exists.");
    }

    const result = await db("users").insertOne(data);
    return result;
};
