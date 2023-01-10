const { createNewReviewService } = require("../services/reviews.service");

exports.createNewReview = async (req, res) => {
    try {
        const result = await createNewReviewService(req.body);

        res.status(200).json({
            status: "success",
            message: "Review created successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to create review",
            error: error.message
        });
    }
};
