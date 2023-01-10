const express = require("express");
const reviewsController = require("../../controllers/reviews.controller");

const router = express.Router();

router.route("/").post(reviewsController.createNewReview);

module.exports = router;