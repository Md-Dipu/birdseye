const express = require("express");
const reviewsController = require("../../controllers/reviews.controller");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router.route("/")
    .post(verifyToken, reviewsController.createNewReview)
    .get(reviewsController.getReviewsController);

module.exports = router;