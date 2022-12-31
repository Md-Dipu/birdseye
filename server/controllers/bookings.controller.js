const { createNewBookingService } = require("../services/bookings.service");

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
