const { createNewReviewService, getReviewsService } = require("../services/reviews.service");
const { queryParser } = require("../utils/queryParser");

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

exports.getReviewsController = async (req, res) => {
    const [filters, queries] = queryParser(req.query);

    try {
        const result = await getReviewsService(filters, queries);

        res.status(200).json({
            status: "success",
            message: "Reviews found successfully",
            data: result.reviews,
            count: result.count
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find reviews",
            error: error.message
        });
    }
};
