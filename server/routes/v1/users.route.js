const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/")
    .post(usersController.createNewUserController)
    .get(usersController.getUsersController);

router.route("/email/:email")
    .patch(usersController.updateUserByEmailController)
    .get(usersController.getUserByEmailController);

module.exports = router;
