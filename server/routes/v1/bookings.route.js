const express = require("express");
const bookingsController = require("../../controllers/bookings.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router.use(verifyToken);

router.route("/")
    .post(bookingsController.createNewBookingController)
    .get(bookingsController.getAllBookingsController);

router.route("/:id")
    .get(bookingsController.getBookingByIdController)
    .patch(bookingsController.updateBookingByIdController)
    .delete(authorization("admin"), bookingsController.deleteBookingByIdController);

module.exports = router;
