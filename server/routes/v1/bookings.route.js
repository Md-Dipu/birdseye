const express = require("express");
const bookingsController = require("../../controllers/bookings.controller");

const router = express.Router();

router.route("/")
    .post(bookingsController.createNewBookingController)
    .get(bookingsController.getAllBookingsController);

module.exports = router;
