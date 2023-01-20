const { ObjectId } = require("mongodb");
const { db } = require("../utils/dbConnection");

/**
 * Insert new booking on database
 * 
 * @typedef {object} Booking
 * @property {string} planId - Plan object id of mongodb
 * @property {string} planName - Name of plan
 * @property {string} coverImageURL - Cover image of plan
 * @property {number} price - Cost of per ticket
 * @property {number} quantity - Number of tickets 
 * @property {number} payableAmount - Sum of prices of tickets
 * @property {number} discount - In percentages
 * @property {User} user - Booking placer user
 * @property {Payment | null} payment - Booking payment
 * @property {Cancelation | null} cancelation - Booking cancel process
 * @property {Date} createdAt - booking time
 * @property {Date} updatedAt - updating time
 * 
 * @typedef {object} User
 * @property {string} userId - User object id of mongodb
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} contactNumber - User contact number
 * 
 * @typedef {object} Payment
 * @property {string} paymentId - Payment object id of mongodb 
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

exports.getAllBookingsService = async (filters, queries) => {
    const bookings = await db("bookings").find(filters)
        .sort(queries.sortby)
        .limit(queries.limit)
        .skip(queries.skip)
        .project(queries.fields)
        .toArray();

    const count = await db("bookings").countDocuments(filters);

    return { bookings, count };
};

exports.getBookingByIdService = async (bookingId) => {
    if (!ObjectId.isValid(bookingId)) {
        throw new Error("Booking isn't valid.");
    }

    const result = await db("bookings").findOne({ _id: ObjectId(bookingId) });
    return result;
};

exports.updateBookingByIdService = async (bookingId, data) => {
    if (!ObjectId.isValid(bookingId)) {
        throw new Error("Booking isn't valid.");
    }

    data.updatedAt = new Date();
    const result = await db("bookings").updateOne({
        _id: ObjectId(bookingId)
    }, {
        $set: data
    });
    return result;
};

exports.deleteBookingByIdService = async (bookingId) => {
    if (!ObjectId.isValid(bookingId)) {
        throw new Error("Booking isn't valid.");
    }

    const result = await db("bookings").deleteOne({ _id: ObjectId(bookingId) });
    return result;
};
