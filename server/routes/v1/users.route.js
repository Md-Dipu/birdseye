const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/")
    .post(usersController.createNewUserController);

router.route("/:email")
    .patch(usersController.updateUserByEmailController);

module.exports = router;
