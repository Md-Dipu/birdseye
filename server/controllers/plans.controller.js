const {
    getAllPlansService,
    getPlanByIdService,
    createNewPlanService,
    updatePlanByIdService,
    deletePlanByIdService
} = require("../services/plans.service");
const { queryParser } = require("../utils/queryParser");

exports.getAllPlansController = async (req, res) => {
    const [filters, queries] = queryParser(req.query);

    try {
        const result = await getAllPlansService(filters, queries);

        res.status(200).json({
            status: "success",
            message: "Plans data found successfully",
            data: result.plans,
            count: result.count
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find data",
            error: error.message
        });
    }
};

exports.getPlanByIdController = async (req, res) => {
    try {
        const result = await getPlanByIdService(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Plans data found successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find data",
            error: error.message
        });
    }
};

exports.createNewPlanController = async (req, res) => {
    try {
        const result = await createNewPlanService(req.body);

        res.status(200).json({
            status: "success",
            message: "Plans data inserted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to insert data",
            error: error.message
        });
    }
};

exports.updatePlanByIdController = async (req, res) => {
    try {
        const result = await updatePlanByIdService(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            message: "Plans data updated successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to update data",
            error: error.message
        });
    }
};

exports.deletePlanByIdController = async (req, res) => {
    try {
        const result = await deletePlanByIdService(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Plan deleted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to delete plan",
            error: error.message
        });
    }
};