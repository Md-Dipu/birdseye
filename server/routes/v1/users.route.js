const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/")
    .post(usersController.createNewUserController)
    .get(usersController.getUsersController);

router.route("/id/:id")
    .patch(usersController.updateUserByIdController)
    .delete(usersController.deleteUserByIdController);

router.route("/email/:email").get(usersController.getUserByEmailController);

module.exports = router;
