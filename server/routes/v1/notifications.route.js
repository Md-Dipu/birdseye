const express = require("express");
const notificationControllers = require("../../controllers/notifications.controller");

const router = express.Router();

router.route("/").post(notificationControllers.createNotificationController);

module.exports = router;