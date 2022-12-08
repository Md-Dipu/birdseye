const { getAllPlansService } = require("../services/plans.service");

exports.getAllPlansController = async (req, res) => {
    try {
        const result = await getAllPlansService();

        res.status(200).json({
            status: "success",
            message: "Plans data found successfully",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Some went wrong",
            error: error.message
        });
    }
};