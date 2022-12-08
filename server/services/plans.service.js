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