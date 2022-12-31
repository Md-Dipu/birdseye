const {
    getAllPlansService,
    getPlanByIdService,
    createNewPlanService
} = require("../services/plans.service");

exports.getAllPlansController = async (req, res) => {
    try {
        const result = await getAllPlansService();

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