const express = require("express");
const notificationControllers = require("../../controllers/notifications.controller");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router.use(verifyToken);

router.route("/")
    .post(notificationControllers.createNotificationController)
    .get(notificationControllers.getNotificationsController);

router.route("/web-mail").post(notificationControllers.createWebMailController);

module.exports = router;