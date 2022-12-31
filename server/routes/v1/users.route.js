const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/").put(usersController.createNewUserController);

module.exports = router;
