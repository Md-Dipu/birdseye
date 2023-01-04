const {
    getAllPlansService,
    getPlanByIdService,
    createNewPlanService
} = require("../services/plans.service");
const queryProcessor = require("../utils/queryProcessor");

exports.getAllPlansController = async (req, res) => {
    const [filters, queries] = queryProcessor(req.query);

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