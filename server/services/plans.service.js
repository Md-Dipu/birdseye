const { db } = require("../utils/dbConnection");

exports.getAllPlansService = async () => {
    const plans = await db("plans").find({}).toArray();
    return plans;
};