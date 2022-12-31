const { ObjectId } = require("mongodb");
const { db } = require("../utils/dbConnection");

/**
 * Insert new booking on database
 * 
 * @typedef {object} Booking
 * @property {ObjectId} planId - Plan object id of mongodb
 * @property {string} planName - Name of plan
 * @property {number} price - Cost of per ticket
 * @property {number} quantity - Number of tickets 
 * @property {number} cost - Products of prices of tickets
 * @property {number} discount - In percentages
 * @property {User} user - Booking placer user
 * @property {Payment | null} payment - Booking payment
 * @property {Cancelation | null} cancelation - Booking cancel process
 * @property {Date} createdAt - booking time
 * @property {Date} updatedAt - updating time
 * 
 * @typedef {object} User
 * @property {ObjectId} userId - User object id of mongodb
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} contactNumber - User contact number
 * 
 * @typedef {object} Payment
 * @property {ObjectId} paymentId - Payment object id of mongodb 
 * @property {number} amount - Payment amount
 * 
 * @typedef {object} Cancelation
 * @property {boolean} requestSended - Cancelation request sended or not
 * @property {string} description - Cancelation reason
 * @property {boolean} requestApproved - Cancelation request approved by admin or not
 * 
 * @param {Booking} data
 * @returns {object} Inserting status from mongodb
 */
exports.createNewBookingService = async (data) => {
    if (!ObjectId.isValid(data.planId) || !ObjectId.isValid(data.user.userId)) {
        throw new Error("Not a valid plan or user.");
    }

    data.payment = null;
    data.cancelation = null;
    data.createdAt = new Date();
    data.updatedAt = data.createdAt;

    const result = await db("bookings").insertOne(data);
    return result;
};

exports.getAllBookingsService = async () => {
    const results = await db("bookings").find({}).toArray();
    return results;
};
