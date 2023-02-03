const express = require("express");
const notificationControllers = require("../../controllers/notifications.controller");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router.use(verifyToken);

router.route("/").post(notificationControllers.createNotificationController);

module.exports = router;