const {
    createNotificationService,
    createAnonymousWebMailService,
    getNotificationsService,
    getNotificationByIdService
} = require("../services/notifications.service");
const { queryParser } = require("../utils/queryParser");

exports.createNotificationController = async (req, res) => {
    try {
        const result = await createNotificationService(req.body);

        res.status(200).json({
            status: "success",
            message: "Notification inserted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to insert notification",
            error: error.message
        });
    }
};

exports.createWebMailController = async (req, res) => {
    try {
        const result = await createAnonymousWebMailService(req.body);

        res.status(200).json({
            status: "success",
            message: "Web-mail sended successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to send web-mail",
            error: error.message
        });
    }
};

exports.getNotificationsController = async (req, res) => {
    const queries = queryParser(req.query)[1];
    const filters = {
        "$or": [
            { "to.sendBy": "role", "to.roles": { "$elemMatch": { "$eq": req.user.role } } },
            { "to.sendBy": "user", "to.ids": { "$elemMatch": { "$eq": req.user._id.toString() } } }
        ]
    };

    try {
        const result = await getNotificationsService(filters, queries);

        res.status(200).json({
            status: "success",
            message: "Notifications found successfully",
            data: result.notifications,
            count: result.count
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find notifications",
            error: error.message
        });
    }
};

exports.getNotificationByIdController = async (req, res) => {
    try {
        const result = await getNotificationByIdService(req.params.id, req.user._id.toString());

        res.status(200).json({
            status: "success",
            message: "Notification found successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to find notification",
            error: error.message
        });
    }
};
