const express = require("express");
const bookingsController = require("../../controllers/bookings.controller");

const router = express.Router();

router.route("/")
    .post(bookingsController.createNewBookingController)
    .get(bookingsController.getAllBookingsController);

router.route("/:id")
    .get(bookingsController.getBookingByIdController)
    .patch(bookingsController.updateBookingByIdController)
    .delete(bookingsController.deleteBookingByIdController);

module.exports = router;
