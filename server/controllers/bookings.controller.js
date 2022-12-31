const {
    createNewBookingService,
    getAllBookingsService,
    getBookingByIdService,
    updateBookingByIdService,
    deleteBookingByIdService
} = require("../services/bookings.service");

exports.createNewBookingController = async (req, res) => {
    try {
        const result = await createNewBookingService(req.body);

        res.status(200).json({
            status: "success",
            message: "Booking data inserted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to insert booking",
            error: error.message
        });
    }
};

exports.getAllBookingsController = async (req, res) => {
    try {
        const result = await getAllBookingsService();

        res.status(200).json({
            status: "success",
            message: "Bookings found successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find bookings",
            error: error.message
        });
    }
};

exports.getBookingByIdController = async (req, res) => {
    try {
        const result = await getBookingByIdService(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Booking found successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find booking",
            error: error.message
        });
    }
};

exports.updateBookingByIdController = async (req, res) => {
    try {
        const result = await updateBookingByIdService(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            message: "Booking updated successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to update booking",
            error: error.message
        });
    }
};

exports.deleteBookingByIdController = async (req, res) => {
    try {
        const result = await deleteBookingByIdService(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Booking deleted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to delete booking",
            error: error.message
        });
    }
};
